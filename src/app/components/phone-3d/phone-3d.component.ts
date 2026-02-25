import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Input,
  NgZone,
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
export class Phone3dComponent implements AfterViewInit, OnDestroy {
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
  /** Which app screen to show: 'home' | 'scan' | 'chat'. */
  @Input() activeScreenId: 'home' | 'scan' | 'chat' = 'home';

  private initTime = Date.now();

  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private canvasTexture: THREE.CanvasTexture | null = null;
  private screenMesh: THREE.Mesh | null = null;
  private animationId: number | null = null;
  private phoneGroup: THREE.Group | null = null;
  private resizeHandler: (() => void) | null = null;
  private containerElement: HTMLDivElement | null = null;

  // Hover-tilt state
  private tiltTarget  = { x: 0, y: 0 };
  private tiltCurrent = { x: 0, y: 0 };
  private tiltMoveHandler:  ((e: MouseEvent) => void) | null = null;
  private tiltLeaveHandler: (() => void)              | null = null;

  /** Default Y rotation so the screen faces the camera. Use as base for animations. */
  private static readonly DEFAULT_ROTATION_Y = Math.PI - Math.PI / 4;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const container = this.threeContainerRef?.nativeElement;
    const appCanvas = this.appCanvasRef?.nativeElement;
    if (!container || !appCanvas) return;

    this.initAppCanvas(appCanvas);
    // Two nested RAFs: first lets Angular finish DOM patching, second waits for CSS layout
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.ngZone.runOutsideAngular(() => this.initThree(container, appCanvas));
      });
    });
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.tiltMoveHandler  && this.containerElement) this.containerElement.removeEventListener('mousemove',  this.tiltMoveHandler);
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

  private initAppCanvas(canvas: HTMLCanvasElement): void {
    // Landscape canvas: portrait content is drawn with a 90°CW axis rotation inside
    // drawCurrentScreen so the UV's inherent reflection renders everything upright.
    canvas.width  = 844;
    canvas.height = 390;
    this.drawCurrentScreen(canvas);
  }

  /** Auto-cycles home → scan → chat every 5 s; called each animation frame. */
  private drawCurrentScreen(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const elapsed = Date.now() - this.initTime;
    const ids: Array<'home' | 'scan' | 'chat'> = ['home', 'scan', 'chat'];
    const screenId = ids[Math.floor(elapsed / 5000) % 3];

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

    if (screenId === 'home') this.drawHomeScreen(ctx, dW, dH, elapsed);
    else if (screenId === 'scan') this.drawScanScreen(ctx, dW, dH, elapsed);
    else this.drawChatScreen(ctx, dW, dH, elapsed);

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
    // Camera background
    ctx.fillStyle = '#0a0f0a';
    ctx.fillRect(0, 0, w, h);

    // Simulated plant glow in viewfinder
    const vfTop = 80, vfH = h - 80 - 170;
    const glow = ctx.createRadialGradient(w / 2, vfTop + vfH / 2, 10, w / 2, vfTop + vfH / 2, 150);
    glow.addColorStop(0, 'rgba(50,120,40,0.55)');
    glow.addColorStop(0.6, 'rgba(30,80,20,0.25)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, vfTop, w, vfH);

    // Leaf shapes
    const leaf = (x: number, y: number, rx: number, ry: number, rot: number, a: number) => {
      ctx.fillStyle = `rgba(60,130,40,${a})`;
      ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); ctx.fill();
    };
    leaf(w / 2, vfTop + vfH / 2, 55, 88, -0.3, 0.5);
    leaf(w / 2 - 35, vfTop + vfH / 2 + 25, 38, 64, 0.4, 0.35);
    leaf(w / 2 + 28, vfTop + vfH / 2 - 15, 46, 70, -0.2, 0.42);

    // Top & bottom dark fades
    const tg = ctx.createLinearGradient(0, 0, 0, vfTop + 50);
    tg.addColorStop(0, 'rgba(0,0,0,0.85)'); tg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = tg; ctx.fillRect(0, 0, w, vfTop + 50);
    const bg = ctx.createLinearGradient(0, h - 220, 0, h);
    bg.addColorStop(0, 'rgba(0,0,0,0)'); bg.addColorStop(1, 'rgba(0,0,0,0.92)');
    ctx.fillStyle = bg; ctx.fillRect(0, h - 220, w, 220);

    // Status bar + header
    this.drawStatusBar(ctx, w, true);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Identificar planta', w / 2, 74);
    ctx.font = '20px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('←', 16, 74);

    // Scanning frame corners
    const fx = 55, fy = vfTop + 28, fw = w - 110, fh = vfH - 56, cs = 30;
    ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = 3;
    [ [fx, fy + cs, fx, fy, fx + cs, fy],
      [fx + fw - cs, fy, fx + fw, fy, fx + fw, fy + cs],
      [fx, fy + fh - cs, fx, fy + fh, fx + cs, fy + fh],
      [fx + fw - cs, fy + fh, fx + fw, fy + fh, fx + fw, fy + fh - cs],
    ].forEach(([x1, y1, x2, y2, x3, y3]) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke();
    });

    // Animated scan line
    const scanP = (elapsed % 2400) / 2400;
    const scanY = fy + scanP * fh;
    const sg = ctx.createLinearGradient(fx, scanY - 10, fx, scanY + 6);
    sg.addColorStop(0, 'rgba(76,175,80,0)');
    sg.addColorStop(0.5, 'rgba(76,175,80,0.85)');
    sg.addColorStop(1, 'rgba(76,175,80,0)');
    ctx.fillStyle = sg; ctx.fillRect(fx, scanY - 10, fw, 16);

    // Center crosshair
    const tcx = w / 2, tcy = fy + fh / 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(tcx, tcy, 38, 0, Math.PI * 2); ctx.stroke();
    [[tcx - 52, tcy, tcx - 42, tcy], [tcx + 42, tcy, tcx + 52, tcy],
     [tcx, tcy - 52, tcx, tcy - 42], [tcx, tcy + 42, tcx, tcy + 52]].forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    });
    ctx.fillStyle = 'rgba(76,175,80,0.9)';
    ctx.beginPath(); ctx.arc(tcx, tcy, 5, 0, Math.PI * 2); ctx.fill();

    // Hint text
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = '13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Apunta la cámara a la planta', w / 2, fy + fh + 22);

    // Detection result — fades in at 70 % of each scan cycle
    if (scanP > 0.68) {
      const a = Math.min(1, (scanP - 0.68) / 0.08);
      ctx.fillStyle = `rgba(30,75,25,${a * 0.94})`;
      ctx.beginPath(); ctx.roundRect(18, h - 230, w - 36, 58, 14); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.font = 'bold 15px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('✓  Árnica mexicana', 34, h - 206);
      ctx.fillStyle = `rgba(190,240,170,${a})`;
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText('Confianza: 94 %  ·  Familia Asteraceae', 34, h - 188);
    }

    // Camera controls
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(w / 2, h - 80, 34, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.beginPath(); ctx.arc(w / 2, h - 80, 26, 0, Math.PI * 2); ctx.fill();
    // Gallery
    ctx.fillStyle = 'rgba(60,120,40,0.6)';
    ctx.beginPath(); ctx.roundRect(w / 2 - 100, h - 96, 40, 32, 6); ctx.fill();
    ctx.font = '16px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌿', w / 2 - 80, h - 74);
    // Flash
    ctx.fillStyle = '#fff';
    ctx.font = '26px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡', w / 2 + 90, h - 72);
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
      const nx = ((e.clientX - rect.left)  / rect.width)  * 2 - 1; // -1 → +1
      const ny = ((e.clientY - rect.top)   / rect.height) * 2 - 1;
      this.tiltTarget.x = -ny * 0.25; // vertical   mouse → X rotation (forward/back tilt)
      this.tiltTarget.y =  nx * 0.30; // horizontal mouse → Y rotation (left/right turn)
    };
    this.tiltLeaveHandler = () => {
      this.tiltTarget.x = 0;
      this.tiltTarget.y = 0;
    };
    container.addEventListener('mousemove',  this.tiltMoveHandler);
    container.addEventListener('mouseleave', this.tiltLeaveHandler);

    const animate = (): void => {
      this.animationId = requestAnimationFrame(animate);

      // Smoothly interpolate tilt toward target (lerp factor ~6% per frame at 60 fps)
      this.tiltCurrent.x += (this.tiltTarget.x - this.tiltCurrent.x) * 0.06;
      this.tiltCurrent.y += (this.tiltTarget.y - this.tiltCurrent.y) * 0.06;
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
      wrapper.scale.setScalar(2.5 / maxDim);
    }

    // Default: screen facing the camera. Animations should start from this orientation.
    wrapper.rotation.y = Phone3dComponent.DEFAULT_ROTATION_Y;

    console.log(
      'Phone3d: model loaded OK.',
      '| Meshes:', meshNames,
      '| Raw size:', size.x.toFixed(3), '×', size.y.toFixed(3), '×', size.z.toFixed(3),
      '| Scale applied:', maxDim > 0 ? (2.5 / maxDim).toFixed(4) : 'n/a',
    );
  }

  /**
   * Set texture repeat and offset so the canvas fits the 3D screen quad without stretch.
   * Uses content aspect: canvas is landscape but the drawn mockup is portrait (rotated), so we use height/width.
   */
  private applyTextureFit(texture: THREE.CanvasTexture, canvasWidth: number, canvasHeight: number): void {
    const Q = this.screenAspectRatio;
    const scale = Math.max(0.25, this.imageScale);
    if (Q == null || Q <= 0) {
      texture.repeat.set(1 / scale, 1 / scale);
      texture.offset.set(0.5 * (1 - 1 / scale), 0.5 * (1 - 1 / scale));
      return;
    }
    const T = canvasWidth / canvasHeight;
    let rx: number;
    let ry: number;
    let ox: number;
    let oy: number;
    if (T >= Q) {
      rx = Q / T;
      ry = 1;
      ox = (1 - Q / T) / 2;
      oy = 0;
    } else {
      rx = 1;
      ry = T / Q;
      ox = 0;
      oy = (1 - T / Q) / 2;
    }
    texture.repeat.set(rx / scale, ry / scale);
    texture.offset.set(ox + 0.5 * rx * (1 - 1 / scale), oy + 0.5 * ry * (1 - 1 / scale));
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
