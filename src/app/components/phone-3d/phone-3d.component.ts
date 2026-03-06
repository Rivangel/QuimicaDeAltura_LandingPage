import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  Input,
  NgZone,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-phone-3d',
  standalone: true,
  templateUrl: './phone-3d.component.html',
  styleUrl: './phone-3d.component.scss',
})
export class Phone3dComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('threeContainer') threeContainerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('appCanvas') appCanvasRef!: ElementRef<HTMLCanvasElement>;

  /** Path to the .glb phone model (screen mesh must be separate/named). */
  @Input() modelUrl = '/resources/3d%20models/Samsung%20phone.glb';
  /** Name of the mesh that represents the screen in the .glb (for applying CanvasTexture). */
  @Input() screenMeshName = 'Screen';
  /**
   * Aspect ratio (width / height) of the 3D screen quad. Must match the screen mesh or the image will stretch.
   * Try: 1 = square (common in GLB), 0.6–0.5 = portrait phone, 1.3 = landscape.
   */
  @Input() screenAspectRatio: number | null = null;
  /**
   * Scale of the image on the screen. 1 = default size, > 1 = zoom in, < 1 = zoom out.
   */
  @Input() imageScale = 1;
  /**
   * Which app screen to show: 'home' | 'scan' | 'chat'.
   * When null (default), the component auto-cycles through all screens every 5 s.
   * When set, that screen is displayed immediately and auto-cycling stops.
   */
  @Input() activeScreenId: 'home' | 'scan' | 'chat' | null = null;

  /**
   * Scale of the 3D phone model in the viewport. 1 = default size, > 1 = larger, < 1 = smaller.
   */
  @Input() modelScale = 1;

  /**
   * Optional real PNG/JPG images to display per screen.
   * When provided, the programmatic canvas drawing is replaced by ctx.drawImage.
   * Images should be 390 × 844 px (portrait).
   */
  @Input() screenImages: Partial<Record<'home' | 'scan' | 'chat', string>> = {};

  private initTime = Date.now();
  /** Timestamp when the scan simulation last reset (used for phase timing).
   *  Reset whenever the scan tab becomes active again for a fresh run. */
  private scanSimStart = Date.now();
  private loadedImages: Partial<Record<'home' | 'scan' | 'chat', HTMLImageElement>> = {};

  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private canvasTexture: THREE.CanvasTexture | null = null;
  private screenMesh: THREE.Mesh | null = null;
  private animationId: number | null = null;
  private phoneGroup: THREE.Group | null = null;
  private resizeHandler: (() => void) | null = null;
  private containerElement: HTMLDivElement | null = null;
  private isVisible = false;
  private visibilityObserver?: IntersectionObserver;

  // Hover-tilt state
  private tiltTarget = { x: 0, y: 0 };
  private tiltCurrent = { x: 0, y: 0 };
  private tiltMoveHandler: ((e: MouseEvent) => void) | null = null;
  private tiltLeaveHandler: (() => void) | null = null;

  /** Default Y rotation so the screen faces the camera. Use as base for animations. */
  private static readonly DEFAULT_ROTATION_Y = Math.PI - Math.PI / 4;

  constructor(private ngZone: NgZone, private hostRef: ElementRef<HTMLElement>) { }

  /** Resets the scan simulation to phase 0 (camera viewfinder). */
  resetScanSim(): void {
    this.scanSimStart = Date.now();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeScreenId']) {
      const current = changes['activeScreenId'].currentValue;
      const previous = changes['activeScreenId'].previousValue;
      // Reset simulation when switching TO the scan tab
      if (current === 'scan' && previous !== 'scan') {
        this.scanSimStart = Date.now();
      }
    }
  }

  ngAfterViewInit(): void {
    const container = this.threeContainerRef?.nativeElement;
    const appCanvas = this.appCanvasRef?.nativeElement;
    if (!container || !appCanvas) return;

    this.preloadImages();
    this.initAppCanvas(appCanvas);

    this.visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = this.isVisible;
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !wasVisible && this.renderer && this.animationId === null) {
          this.ngZone.runOutsideAngular(() => this.startAnimationLoop());
        }
      },
      { rootMargin: '200px' }
    );
    this.visibilityObserver.observe(this.hostRef.nativeElement);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.ngZone.runOutsideAngular(() => this.initThree(container, appCanvas));
      });
    });
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
    this.animationId = null;
    this.visibilityObserver?.disconnect();
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.tiltMoveHandler && this.containerElement) this.containerElement.removeEventListener('mousemove', this.tiltMoveHandler);
    if (this.tiltLeaveHandler && this.containerElement) this.containerElement.removeEventListener('mouseleave', this.tiltLeaveHandler);
    if (this.renderer?.domElement && this.containerElement) {
      this.containerElement.removeChild(this.renderer.domElement);
    }
    this.canvasTexture?.dispose();
    this.renderer?.dispose();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.canvasTexture = null;
    this.screenMesh = null;
    this.phoneGroup = null;
    this.resizeHandler = null;
    this.containerElement = null;
    // The Display mesh UVs are reflected+rotated relative to portrait.
    // Fix: landscape canvas (w/h swapped) + 90° CW draw.
  }

  private preloadImages(): void {
    const ids = ['home', 'scan', 'chat'] as const;
    for (const id of ids) {
      const src = this.screenImages[id];
      if (src && !this.loadedImages[id]) {
        const img = new Image();
        img.src = src;
        this.loadedImages[id] = img;
      }
    }
  }

  private initAppCanvas(canvas: HTMLCanvasElement): void {
    // Landscape canvas: portrait content is drawn with a 90°CW axis rotation inside
    // drawCurrentScreen so the UV's inherent reflection renders everything upright.
    canvas.width = 844;
    canvas.height = 390;
    this.drawCurrentScreen(canvas);
  }

  /** Shows the screen set by activeScreenId, or auto-cycles every 5 s when null. */
  private drawCurrentScreen(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const elapsed = Date.now() - this.initTime;
    const ids: Array<'home' | 'scan' | 'chat'> = ['home', 'scan', 'chat'];
    const screenId = this.activeScreenId ?? ids[Math.floor(elapsed / 5000) % 3];

    // Canvas is landscape (844×390). Apply a 90°CW ctx rotation so portrait drawing
    // code (dW=390, dH=844) fills the canvas correctly. The UV's inherent reflection
    // then cancels the rotation and renders the content upright on the phone screen.
    ctx.save();
    ctx.translate(canvas.width, 0); // origin → top-right of landscape canvas
    ctx.rotate(Math.PI / 2);        // rotate axes 90°CW
    const dW = canvas.height;       // effective portrait width  = 390
    const dH = canvas.width;        // effective portrait height = 844

    ctx.fillStyle = '#f5f0eb';
    ctx.fillRect(0, 0, dW, dH);

    const img = this.loadedImages[screenId];
    if (img?.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, 0, 0, dW, dH);
    } else if (screenId === 'home') {
      this.drawHomeScreen(ctx, dW, dH, elapsed);
    } else if (screenId === 'scan') {
      this.drawScanScreen(ctx, dW, dH, elapsed);
    } else {
      this.drawChatScreen(ctx, dW, dH, elapsed);
    }

    ctx.restore();
  }

  private drawStatusBar(ctx: CanvasRenderingContext2D, w: number, dark = false): void {
    ctx.fillStyle = dark ? 'rgba(0,0,0,0.45)' : 'transparent';
    ctx.fillRect(0, 0, w, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('9:41', 16, 29);
    // Signal bars
    for (let i = 0; i < 4; i++) {
      const bh = 5 + i * 3;
      ctx.fillRect(w - 68 + i * 7, 30 - bh, 5, bh);
    }
    // Battery outline + fill
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(w - 30, 17, 22, 12);
    ctx.fillStyle = '#fff';
    ctx.fillRect(w - 28, 19, 16, 8);
    ctx.fillRect(w - 8, 21, 3, 4); // tip
  }

  private drawHomeScreen(ctx: CanvasRenderingContext2D, w: number, h: number, _elapsed: number): void {
    const G = '#2d5a27';
    const GL = '#4a7c3f';
    const W = '#ffffff';

    // ── Header ──────────────────────────────────────────────
    ctx.fillStyle = G;
    ctx.fillRect(0, 0, w, 100);
    this.drawStatusBar(ctx, w);
    ctx.fillStyle = W;
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Inicio', w / 2, 76);
    // Hamburger
    for (let i = 0; i < 3; i++) { ctx.fillStyle = W; ctx.fillRect(w - 44, 57 + i * 8, 24, 3); }

    let y = 108;

    // ── Welcome banner ──────────────────────────────────────
    ctx.fillStyle = '#e8f5e3';
    ctx.beginPath(); ctx.roundRect(12, y, w - 24, 70, 12); ctx.fill();
    // Avatar circle
    ctx.fillStyle = G;
    ctx.beginPath(); ctx.arc(46, y + 35, 24, 0, Math.PI * 2); ctx.fill();
    ctx.font = '22px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌿', 46, y + 43);
    ctx.fillStyle = '#1a2e1a';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('¡Bienvenido, Ángel!', 82, y + 25);
    ctx.fillStyle = '#556';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText('Descubre plantas y sus propiedades', 82, y + 43);
    ctx.fillText('medicinales.', 82, y + 58);

    y += 82;

    // ── Search bar ──────────────────────────────────────────
    ctx.fillStyle = W;
    ctx.beginPath(); ctx.roundRect(12, y, w - 60, 40, 20); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#999';
    ctx.font = '13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🔍  Buscar plantas por nombre', 26, y + 26);
    // Filter button
    ctx.fillStyle = G;
    ctx.beginPath(); ctx.roundRect(w - 44, y, 32, 40, 10); ctx.fill();
    ctx.font = '18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = W;
    ctx.fillText('⊞', w - 28, y + 27);

    y += 52;

    // ── Planta del día ──────────────────────────────────────
    ctx.fillStyle = '#1a2e1a';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Planta del día', 14, y + 14);
    y += 22;

    ctx.fillStyle = G;
    ctx.beginPath(); ctx.roundRect(12, y, w - 24, 90, 12); ctx.fill();
    // Flower circle
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath(); ctx.arc(54, y + 45, 32, 0, Math.PI * 2); ctx.fill();
    ctx.font = '30px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌼', 54, y + 54);
    ctx.fillStyle = W;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Árnica mexicana', 98, y + 28);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('Ver detalles ›', w - 20 - ctx.measureText('Ver detalles ›').width, y + 16);
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.fillText('Alivia inflamaciones y problemas', 98, y + 47);
    ctx.fillText('digestivos. Uso tradicional.', 98, y + 62);
    // "Ver" button
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath(); ctx.roundRect(98, y + 70, 80, 14, 7); ctx.fill();
    ctx.fillStyle = W;
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Ver más', 138, y + 81);

    y += 104;

    // ── Más buscadas ────────────────────────────────────────
    ctx.fillStyle = '#1a2e1a';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Más buscadas', 14, y + 14);
    ctx.fillStyle = GL;
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Ver más ›', w - 14, y + 14);
    y += 24;

    const plants = [
      { name: 'Árnica', emoji: '🌼', bg: '#c8a02a' },
      { name: 'Epazote', emoji: '🌿', bg: '#2d7a2d' },
      { name: 'Manzanilla', emoji: '🌸', bg: '#c06090' },
    ];
    const cw = (w - 36) / 3;
    plants.forEach((p, i) => {
      const cx2 = 12 + i * (cw + 6);
      ctx.fillStyle = W;
      ctx.beginPath(); ctx.roundRect(cx2, y, cw, 114, 10); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'; ctx.lineWidth = 1; ctx.stroke();
      // Colored circle
      ctx.fillStyle = p.bg + '44';
      ctx.beginPath(); ctx.arc(cx2 + cw / 2, y + 34, 26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = p.bg;
      ctx.beginPath(); ctx.arc(cx2 + cw / 2, y + 34, 21, 0, Math.PI * 2); ctx.fill();
      ctx.font = '18px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.emoji, cx2 + cw / 2, y + 42);
      ctx.fillStyle = '#1a2e1a';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.name, cx2 + cw / 2, y + 70);
      // Ver button
      ctx.fillStyle = G;
      ctx.beginPath(); ctx.roundRect(cx2 + 8, y + 82, cw - 16, 22, 11); ctx.fill();
      ctx.fillStyle = W;
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText('Ver detalle', cx2 + cw / 2, y + 97);
    });

    y += 126;

    // ── Bottom nav ──────────────────────────────────────────
    ctx.fillStyle = W;
    ctx.fillRect(0, h - 62, w, 62);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, h - 62); ctx.lineTo(w, h - 62); ctx.stroke();
    const navIcons = ['🏠', '📷', '💬'];
    navIcons.forEach((icon, i) => {
      const nx = (w / 3) * i + w / 6;
      ctx.font = '22px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = i === 0 ? G : '#bbb';
      ctx.fillText(icon, nx, h - 28);
      if (i === 0) {
        ctx.fillStyle = G;
        ctx.beginPath(); ctx.arc(nx, h - 11, 3, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  private drawScanScreen(ctx: CanvasRenderingContext2D, w: number, h: number, elapsed: number): void {
    // ── Simulation phases (loop every 10 s) ──────────────────────────────────
    // Phase 0 (0-3.5s):  Camera viewfinder — corner brackets, leaf glow, active shutter button
    // Phase 1 (3.5-5.5s): Flash → "Analizando..." spinner, disabled button
    // Phase 2 (5.5-10s):  Results panel slides up from bottom
    const CYCLE = 10000;
    const simElapsed = (Date.now() - this.scanSimStart) % CYCLE;
    const phase = simElapsed < 3500 ? 0 : simElapsed < 5500 ? 1 : 2;
    const phaseT = phase === 0 ? simElapsed / 3500
      : phase === 1 ? (simElapsed - 3500) / 2000
        : (simElapsed - 5500) / 4500;

    // ── Background ───────────────────────────────────────────────────────────
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    // Simulated plant glow in viewfinder
    const vfTop = 80;
    const vfH = h - 80 - 170;
    const leafAlpha = phase === 0 ? 1 : phase === 1 ? Math.max(0, 1 - phaseT * 3) : 0;

    if (leafAlpha > 0) {
      const glow = ctx.createRadialGradient(w / 2, vfTop + vfH / 2, 10, w / 2, vfTop + vfH / 2, 140);
      glow.addColorStop(0, `rgba(50,120,40,${0.55 * leafAlpha})`);
      glow.addColorStop(0.6, `rgba(30,80,20,${0.25 * leafAlpha})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, vfTop, w, vfH);

      // Leaf shapes
      const leaf = (lx: number, ly: number, lrx: number, lry: number, rot: number, a: number) => {
        ctx.fillStyle = `rgba(60,130,40,${a * leafAlpha})`;
        ctx.beginPath(); ctx.ellipse(lx, ly, lrx, lry, rot, 0, Math.PI * 2); ctx.fill();
      };
      leaf(w / 2, vfTop + vfH / 2, 55, 88, -0.3, 0.5);
      leaf(w / 2 - 35, vfTop + vfH / 2 + 25, 38, 64, 0.4, 0.35);
      leaf(w / 2 + 28, vfTop + vfH / 2 - 15, 46, 70, -0.2, 0.42);
    }

    // Top & bottom dark fades
    const tg = ctx.createLinearGradient(0, 0, 0, vfTop + 50);
    tg.addColorStop(0, 'rgba(0,0,0,0.85)'); tg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = tg; ctx.fillRect(0, 0, w, vfTop + 50);
    const bfg = ctx.createLinearGradient(0, h - 220, 0, h);
    bfg.addColorStop(0, 'rgba(0,0,0,0)'); bfg.addColorStop(1, 'rgba(0,0,0,0.92)');
    ctx.fillStyle = bfg; ctx.fillRect(0, h - 220, w, 220);

    // ── Phase 1 flash overlay ─────────────────────────────────────────────────
    if (phase === 1 && phaseT < 0.15) {
      const flashA = 1 - phaseT / 0.15;
      ctx.fillStyle = `rgba(255,255,255,${flashA * 0.85})`;
      ctx.fillRect(0, 0, w, h);
    }

    // ── Status bar + header ───────────────────────────────────────────────────
    this.drawStatusBar(ctx, w, true);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Detectar Planta', w / 2, 74);
    // Back arrow (circle)
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(32, 68, 18, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = '16px system-ui, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('←', 32, 74);

    // ── Scan corner brackets ──────────────────────────────────────────────────
    const fx = 48, fy = vfTop + 30, fw = w - 96, fh = vfH - 60, cs = 28;
    const cornerAlpha = phase === 2 ? Math.max(0, 1 - phaseT * 2) : 1;
    if (cornerAlpha > 0) {
      ctx.strokeStyle = `rgba(255,255,255,${cornerAlpha})`; ctx.lineWidth = 3;
      [
        [fx, fy + cs, fx, fy, fx + cs, fy],
        [fx + fw - cs, fy, fx + fw, fy, fx + fw, fy + cs],
        [fx, fy + fh - cs, fx, fy + fh, fx + cs, fy + fh],
        [fx + fw - cs, fy + fh, fx + fw, fy + fh, fx + fw, fy + fh - cs],
      ].forEach(([x1, y1, x2, y2, x3, y3]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke();
      });
    }

    // ── Phase 0: animated scan line ───────────────────────────────────────────
    if (phase === 0) {
      const scanP = (elapsed % 2400) / 2400;
      const scanY = fy + scanP * fh;
      const sg = ctx.createLinearGradient(fx, scanY - 8, fx, scanY + 8);
      sg.addColorStop(0, 'rgba(76,175,80,0)');
      sg.addColorStop(0.5, 'rgba(76,175,80,0.9)');
      sg.addColorStop(1, 'rgba(76,175,80,0)');
      ctx.fillStyle = sg; ctx.fillRect(fx, scanY - 8, fw, 16);
    }

    // ── Phase 1: "Analizando..." spinner ──────────────────────────────────────
    if (phase === 1) {
      const spinnerA = Math.min(1, phaseT * 3);
      const angle = (elapsed / 400) % (Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${spinnerA})`; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(w / 2, fy + fh / 2, 28, angle, angle + Math.PI * 1.3);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${spinnerA})`;
      ctx.font = 'bold 15px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Analizando...', w / 2, fy + fh / 2 + 52);
    }

    // ── Phase 2: results panel slides up ─────────────────────────────────────
    if (phase === 2) {
      const panelSlide = Math.min(1, phaseT * 1.8); // 0→1 over first ~56% of phase
      const eased = 1 - Math.pow(1 - panelSlide, 3); // ease-out cubic
      const panelH = h * 0.62;
      const panelY = h - panelH * eased;

      // White rounded panel
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.roundRect(0, panelY, w, panelH + 20, [20, 20, 0, 0]);
      ctx.fill();

      // Drag handle
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath(); ctx.roundRect(w / 2 - 18, panelY + 10, 36, 4, 2); ctx.fill();

      const ty = panelY + 30; // top of panel content
      const contentA = Math.min(1, Math.max(0, (eased - 0.4) / 0.4));

      if (contentA > 0) {
        // Plant icon (rounded green box)
        ctx.fillStyle = `rgba(240,247,237,${contentA})`;
        ctx.beginPath(); ctx.roundRect(16, ty, 52, 52, 12); ctx.fill();
        ctx.font = '26px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(94,121,75,${contentA})`;
        ctx.fillText('🌼', 42, ty + 36);

        // Plant name
        ctx.fillStyle = `rgba(30,50,30,${contentA})`;
        ctx.font = 'bold 17px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Árnica mexicana', 78, ty + 22);
        ctx.fillStyle = `rgba(94,121,75,${contentA})`;
        ctx.font = '12px system-ui, sans-serif';
        ctx.fillText('Heterotheca inuloides Cass.', 78, ty + 42);

        // Divider
        ctx.strokeStyle = `rgba(0,0,0,0.08)`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(16, ty + 64); ctx.lineTo(w - 16, ty + 64); ctx.stroke();

        // Descripción section
        const dy = ty + 80;
        ctx.fillStyle = `rgba(30,50,30,${contentA})`;
        // Info icon
        ctx.strokeStyle = `rgba(94,121,75,${contentA})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(24, dy, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.font = 'bold 10px system-ui, sans-serif'; ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(94,121,75,${contentA})`;
        ctx.fillText('i', 24, dy + 4);
        ctx.font = 'bold 14px system-ui, sans-serif'; ctx.textAlign = 'left';
        ctx.fillText('Descripción', 38, dy + 5);

        const descLines = [
          'La árnica mexicana es una planta perenne',
          'que crece en regiones montañosas de México,',
          'especialmente en Puebla, Veracruz y Oaxaca.',
          'Alcanza 30-60 cm con flores amarillas.',
        ];
        ctx.font = '11px system-ui, sans-serif';
        ctx.fillStyle = `rgba(80,80,80,${contentA})`;
        descLines.forEach((l, i) => {
          ctx.fillText(l, 16, dy + 26 + i * 16);
        });

        // Propiedades terapéuticas
        const pTop = dy + 98;
        ctx.font = 'bold 14px system-ui, sans-serif';
        ctx.fillStyle = `rgba(94,121,75,${contentA})`;
        ctx.fillText('Propiedades terapéuticas', 16, pTop);

        const props = [
          { label: 'Antinflamatoria', icon: '🩹', pct: 95 },
          { label: 'Analgésica', icon: '💧', pct: 90 },
          { label: 'Antibacterial', icon: '🌡', pct: 85 },
        ];
        const colW = (w - 32) / 3;
        props.forEach((p, i) => {
          const cx = 16 + colW * i + colW / 2;
          const cy = pTop + 54;
          const r = 26;
          // Background circle
          ctx.strokeStyle = `rgba(94,121,75,0.15)`; ctx.lineWidth = 5;
          ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI * 2 - Math.PI / 2); ctx.stroke();
          // Progress arc
          const arcEnd = -Math.PI / 2 + (p.pct / 100) * Math.PI * 2 * Math.min(1, contentA * 2);
          ctx.strokeStyle = `rgba(94,121,75,${contentA})`; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, arcEnd); ctx.stroke();
          // Icon inside
          ctx.font = '16px system-ui, sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(p.icon, cx, cy + 6);
          // Label
          ctx.fillStyle = `rgba(94,121,75,${contentA})`;
          ctx.font = '9px system-ui, sans-serif';
          ctx.fillText(p.label, cx, cy + r + 14);
          // Percentage
          ctx.fillStyle = `rgba(60,60,60,${contentA})`;
          ctx.font = 'bold 11px system-ui, sans-serif';
          ctx.fillText(`${p.pct}%`, cx, cy + r + 26);
        });
      }
    }

    // ── Bottom camera button ──────────────────────────────────────────────────
    const btnDisabled = phase !== 0;
    const btnColor = btnDisabled ? 'rgba(100,100,100,0.8)' : 'rgba(255,255,255,0.95)';
    const btnInner = btnDisabled ? 'rgba(80,80,80,0.9)' : '#fff';
    ctx.strokeStyle = btnColor; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(w / 2, h - 68, 30, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = btnInner;
    ctx.beginPath(); ctx.arc(w / 2, h - 68, 22, 0, Math.PI * 2); ctx.fill();
    // Camera icon inside button
    if (!btnDisabled) {
      ctx.strokeStyle = '#666'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(w / 2 - 9, h - 77, 18, 14, 3); ctx.stroke();
      ctx.beginPath(); ctx.arc(w / 2, h - 70, 4, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = btnDisabled ? 'rgba(160,160,160,0.7)' : 'rgba(60,60,60,0.9)';
    ctx.font = '11px system-ui, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Tomar foto', w / 2, h - 30);
  }

  private drawChatScreen(ctx: CanvasRenderingContext2D, w: number, h: number, elapsed: number): void {
    const PU = '#3d1f52';
    const G = '#2d5a27';
    const BG = '#f0edf6';

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);

    // ── Header ──────────────────────────────────────────────
    ctx.fillStyle = PU;
    ctx.fillRect(0, 0, w, 100);
    this.drawStatusBar(ctx, w);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath(); ctx.arc(50, 73, 22, 0, Math.PI * 2); ctx.fill();
    ctx.font = '20px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🤖', 50, 81);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 17px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Asistente Yolotl', 82, 68);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText('● En línea', 82, 86);
    ctx.fillStyle = '#fff';
    ctx.font = '20px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('←', 16, 74);

    const pad = 14;
    let y = 110;

    // Timestamp
    ctx.fillStyle = '#aaa';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Hoy, 10:23 AM', w / 2, y + 12);
    y += 30;

    // Bot bubble 1
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.roundRect(pad, y, 230, 52, [4, 14, 14, 14]); ctx.fill();
    ctx.shadowColor = 'rgba(0,0,0,0.07)'; ctx.shadowBlur = 5;
    ctx.fillStyle = '#222';
    ctx.font = '13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('¡Hola! Soy Yolotl 🌿', pad + 12, y + 22);
    ctx.fillText('¿En qué te puedo ayudar?', pad + 12, y + 40);
    ctx.shadowBlur = 0;
    y += 64;

    // User bubble
    ctx.fillStyle = PU;
    ctx.beginPath(); ctx.roundRect(w - pad - 224, y, 224, 36, [14, 4, 14, 14]); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('¿Para qué sirve la manzanilla?', w - pad - 212, y + 23);
    y += 50;

    // Bot bubble 2 (multiline)
    const lines = [
      'La manzanilla es antiinflamatoria.',
      'Calma el sistema digestivo,',
      'reduce la ansiedad y mejora',
      'el sueño. 🌸',
    ];
    const bh2 = lines.length * 19 + 20;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.roundRect(pad, y, w - pad * 2 - 14, bh2, [4, 14, 14, 14]); ctx.fill();
    ctx.shadowColor = 'rgba(0,0,0,0.07)'; ctx.shadowBlur = 5;
    lines.forEach((l, i) => {
      ctx.fillStyle = '#222';
      ctx.font = '13px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(l, pad + 12, y + 18 + i * 19);
    });
    ctx.shadowBlur = 0;
    y += bh2 + 12;

    // Suggestion chip
    ctx.fillStyle = 'rgba(45,90,39,0.13)';
    ctx.beginPath(); ctx.roundRect(pad, y, 162, 32, 16); ctx.fill();
    ctx.fillStyle = G;
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌿  Ver ficha de manzanilla', pad + 81, y + 21);
    y += 46;

    // User bubble 2
    ctx.fillStyle = PU;
    ctx.beginPath(); ctx.roundRect(w - pad - 152, y, 152, 36, [14, 4, 14, 14]); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¿Cómo la preparo?', w - pad - 76, y + 23);
    y += 50;

    // Typing indicator (animated dots)
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.roundRect(pad, y, 72, 36, [4, 14, 14, 14]); ctx.fill();
    const dotPhase = (elapsed % 1200) / 1200;
    for (let i = 0; i < 3; i++) {
      const a = 0.3 + 0.7 * Math.abs(Math.sin((dotPhase + i / 3) * Math.PI));
      ctx.fillStyle = `rgba(100,100,120,${a})`;
      ctx.beginPath(); ctx.arc(pad + 14 + i * 18, y + 18, 5, 0, Math.PI * 2); ctx.fill();
    }

    // ── Input bar ────────────────────────────────────────────
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, h - 64, w, 64);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, h - 64); ctx.lineTo(w, h - 64); ctx.stroke();
    ctx.fillStyle = BG;
    ctx.beginPath(); ctx.roundRect(12, h - 50, w - 58, 36, 18); ctx.fill();
    ctx.fillStyle = '#bbb';
    ctx.font = '13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Escribe un mensaje...', 28, h - 27);
    ctx.fillStyle = PU;
    ctx.beginPath(); ctx.arc(w - 22, h - 32, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '15px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('➤', w - 22, h - 27);
  }

  private initThree(container: HTMLDivElement, appCanvas: HTMLCanvasElement): void {
    const scene = new THREE.Scene();
    this.scene = scene;

    // Use parent dimensions if container not yet laid out (0x0)
    const w = container.clientWidth || container.parentElement?.clientWidth || 800;
    const h = container.clientHeight || container.parentElement?.clientHeight || 480;
    const aspect = w / h || 16 / 9;

    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.set(0, 0, 4);
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.containerElement = container;
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(2, 3, 5);
    scene.add(dir);

    // Canvas as texture for screen
    const texture = new THREE.CanvasTexture(appCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.flipY = false; // match common GLB screen UVs
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    this.applyTextureFit(texture, appCanvas.width, appCanvas.height);
    this.canvasTexture = texture;

    const loader = new GLTFLoader();
    loader.load(
      this.modelUrl,
      (gltf: GLTF) => this.onModelLoaded(gltf, scene, texture),
      undefined,
      (err: unknown) => console.warn('Phone3dComponent: GLB load error', err)
    );

    this.resizeHandler = (): void => {
      if (!this.camera || !this.renderer) return;
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 480;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();

    // Hover-tilt listeners (registered outside Angular zone — no CD needed)
    this.tiltMoveHandler = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 → +1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      this.tiltTarget.x = -ny * 0.45; // vertical   mouse → X rotation (forward/back tilt)
      this.tiltTarget.y = nx * 0.55; // horizontal mouse → Y rotation (left/right turn)
    };
    this.tiltLeaveHandler = () => {
      this.tiltTarget.x = 0;
      this.tiltTarget.y = 0;
    };
    container.addEventListener('mousemove', this.tiltMoveHandler);
    container.addEventListener('mouseleave', this.tiltLeaveHandler);

    this.startAnimationLoop();
  }

  private startAnimationLoop(): void {
    const scene = this.scene;
    const camera = this.camera;
    if (!scene || !camera) return;

    const animate = (): void => {
      if (!this.isVisible) {
        this.animationId = null;
        return;
      }
      this.animationId = requestAnimationFrame(animate);

      this.tiltCurrent.x += (this.tiltTarget.x - this.tiltCurrent.x) * 0.10;
      this.tiltCurrent.y += (this.tiltTarget.y - this.tiltCurrent.y) * 0.10;
      if (this.phoneGroup) {
        this.phoneGroup.rotation.x = this.tiltCurrent.x;
        this.phoneGroup.rotation.y = Phone3dComponent.DEFAULT_ROTATION_Y + this.tiltCurrent.y;
      }

      const canvas = this.appCanvasRef?.nativeElement;
      if (canvas) this.drawCurrentScreen(canvas);
      if (this.canvasTexture) this.canvasTexture.needsUpdate = true;
      this.renderer?.render(scene, camera);
    };
    animate();
  }

  private onModelLoaded(gltf: GLTF, scene: THREE.Scene, texture: THREE.CanvasTexture): void {
    const model = gltf.scene;
    this.phoneGroup = model;
    const meshNames: string[] = [];
    let fallbackScreenMesh: THREE.Mesh | null = null;
    model.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name || '';
        meshNames.push(name || '(unnamed)');
        if (name === this.screenMeshName) {
          this.screenMesh = child;
          this.applyScreenTexture(child, texture);
          this.calibrateTextureToMeshUVs(child, texture);
        } else if (
          !fallbackScreenMesh &&
          /screen|pantalla|display|display_0|glass/i.test(name)
        ) {
          fallbackScreenMesh = child;
        }
      }
    });
    if (!this.screenMesh && fallbackScreenMesh) {
      const mesh = fallbackScreenMesh as THREE.Mesh;
      this.screenMesh = mesh;
      this.applyScreenTexture(mesh, texture);
      this.calibrateTextureToMeshUVs(mesh, texture);
      console.log('Phone3d: using mesh "' + mesh.name + '" as screen (name match)');
    }
    if (!this.screenMesh && meshNames.length) {
      console.warn('Phone3d: screen mesh "' + this.screenMeshName + '" not found. Available mesh names:', meshNames);
    }

    // Use a wrapper group so centering and scaling work correctly together:
    // 1. Center the model inside the wrapper (subtracting bounding-box center from model.position)
    // 2. Scale the wrapper — this scales both geometry AND the position offset proportionally,
    //    so the model center stays exactly at world origin regardless of GLB units.
    const wrapper = new THREE.Group();
    this.phoneGroup = wrapper; // animation loop rotates this
    scene.add(wrapper);
    wrapper.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Center model inside wrapper
    model.position.sub(center);

    // Scale wrapper to fit view (target 2.5 units ≈ 85% of view height at FOV 40°, z=4)
    if (maxDim > 0) {
      const baseScale = 2.5 / maxDim;
      wrapper.scale.setScalar(baseScale * Math.max(0.2, this.modelScale));
    }

    // Default: screen facing the camera. Animations should start from this orientation.
    wrapper.rotation.y = Phone3dComponent.DEFAULT_ROTATION_Y;

    const appliedScale = maxDim > 0 ? (2.5 / maxDim) * Math.max(0.2, this.modelScale) : 0;
    console.log(
      'Phone3d: model loaded OK.',
      '| Meshes:', meshNames,
      '| Raw size:', size.x.toFixed(3), '×', size.y.toFixed(3), '×', size.z.toFixed(3),
      '| Scale applied:', maxDim > 0 ? appliedScale.toFixed(4) : 'n/a',
    );
  }

  /**
   * Set texture repeat and offset so the canvas covers the 3D screen quad (object-fit: cover).
   * Canvas is landscape (844×390) but content is portrait (390×844 effective, drawn with 90°CW rotation).
   * Content portrait aspect: Rc = canvasH / canvasW ≈ 0.462.
   */
  private applyTextureFit(texture: THREE.CanvasTexture, canvasWidth: number, canvasHeight: number): void {
    const Q = this.screenAspectRatio;
    const scale = Math.max(0.25, this.imageScale);

    // Content portrait aspect (canvas is landscape with 90°CW rotated portrait content)
    const Rc = canvasHeight / canvasWidth; // = 390/844 ≈ 0.462

    if (Q == null || Q <= 0) {
      // No screen aspect provided → map full canvas (works when screen UV matches Rc)
      const rx = 1 / scale;
      const ry = 1 / scale;
      texture.repeat.set(rx, ry);
      texture.offset.set((1 - rx) / 2, (1 - ry) / 2);
      return;
    }

    // object-fit: cover for rotated canvas
    let rx: number, ry: number;
    if (Rc <= Q) {
      // Content portrait narrower than screen → fill width, clip portrait height (canvas U)
      rx = Rc / Q;
      ry = 1;
    } else {
      // Content portrait wider than screen → fill height, clip portrait width (canvas V)
      rx = 1;
      ry = Q / Rc;
    }

    // Apply zoom scale
    rx /= scale;
    ry /= scale;

    // Center (clamp to avoid out-of-range sampling)
    texture.repeat.set(rx, ry);
    texture.offset.set(Math.max(0, (1 - rx) / 2), Math.max(0, (1 - ry) / 2));
  }

  /**
   * Reads the actual UV bounding box of the screen mesh and sets texture.repeat / offset
   * so the canvas content (UV [0,1]×[0,1]) covers exactly that range.
   * This corrects for phone GLBs where the screen mesh UVs don't span [0,1]×[0,1].
   */
  private calibrateTextureToMeshUVs(mesh: THREE.Mesh, texture: THREE.CanvasTexture): void {
    const uvAttr = mesh.geometry.getAttribute('uv') as THREE.BufferAttribute | undefined;
    if (!uvAttr || uvAttr.count === 0) return;

    let uMin = Infinity, uMax = -Infinity, vMin = Infinity, vMax = -Infinity;
    for (let i = 0; i < uvAttr.count; i++) {
      const u = uvAttr.getX(i), v = uvAttr.getY(i);
      if (u < uMin) uMin = u; if (u > uMax) uMax = u;
      if (v < vMin) vMin = v; if (v > vMax) vMax = v;
    }

    const uvW = uMax - uMin;
    const uvH = vMax - vMin;
    if (uvW <= 0 || uvH <= 0) return;

    const rx = 1 / uvW;
    const ry = 1 / uvH;
    texture.repeat.set(rx, ry);
    texture.offset.set(-uMin * rx, -vMin * ry);
    texture.needsUpdate = true;

    console.log(
      `Phone3d: screen UV bounds U[${uMin.toFixed(3)}, ${uMax.toFixed(3)}]`,
      `V[${vMin.toFixed(3)}, ${vMax.toFixed(3)}]`,
      `→ repeat(${rx.toFixed(3)}, ${ry.toFixed(3)})`,
      `offset(${(-uMin * rx).toFixed(3)}, ${(-vMin * ry).toFixed(3)})`,
    );
  }

  private applyScreenTexture(mesh: THREE.Mesh, texture: THREE.CanvasTexture): void {
    if (mesh.material && Array.isArray(mesh.material) === false) {
      (mesh.material as THREE.Material).dispose();
    }
    // MeshBasicMaterial so the screen is always visible, not dependent on scene lights
    const screenMat = new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
    mesh.material = screenMat;
    mesh.material.needsUpdate = true;
  }
}
