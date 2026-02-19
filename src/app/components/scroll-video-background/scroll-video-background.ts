import {
    Component,
    HostListener,
    OnInit,
    OnDestroy,
    ElementRef,
    ViewChild,
    AfterViewInit,
    NgZone,
    signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnaHoverService } from '../../services/dna-hover.service';
import { Subscription } from 'rxjs';

interface SceneState {
    tiltX: number;
    tiltZ: number;
    zoom: number;
    offsetX: number;
    offsetY: number;
}

type WordNode = {
    el: HTMLElement;
    index: number;
    originalWord: string;
    matrixCycle: number;
    lastUpdate: number;
    isFading: boolean;
    fadedChars: Set<number>;      // destroyed
    builtChars: Set<number>;      // constructed
    fadeStartTime?: number;
    buildStartTime?: number;
};

interface Node extends WordNode {}

@Component({
    selector: 'app-scroll-video-background',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-video-background.html',
    styleUrl: './scroll-video-background.scss'
})
export class ScrollVideoBackground implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('bondsCanvas', { static: false }) bondsCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('strandA', { static: false }) strandA!: ElementRef<HTMLDivElement>;
    @ViewChild('strandB', { static: false }) strandB!: ElementRef<HTMLDivElement>;

    // Constants
    private readonly WORDS = ['NATURALEZA', 'SALUD', 'PLANTAS', 'TRADICIÓN', 'CIENCIA', 'BIENESTAR'];
    private readonly MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Get a random glitch character (fixed-width, no spaces or special chars that cause layout shifts)
    private getGlitchChar(): string {
        return this.MATRIX_CHARS[Math.floor(Math.random() * this.MATRIX_CHARS.length)];
    }
    private readonly COUNT = 120;
    private readonly RADIUS = 220;
    private readonly SPACING = 18;
    private readonly SPEED = 0.002;
    private readonly PAGE_COLOR = '#5E794B'; // Primary page color
    private readonly AMBER_COLOR = '#C4964A'; // Amber accent color
    private readonly FORCE_HIDE_AFTER = 600; // ms
    private readonly FORCE_BUILD_AFTER = 600; // ms

    // Scene configurations
    private readonly SCENES: SceneState[] = [
        // Scene 0 – diagonal close-up, dead centre
        { tiltX: 25, tiltZ: 45, zoom: 2.6, offsetX: 0, offsetY: 0 },
        // Scene 1 – vertical, normal size, LEFT
        { tiltX: 0, tiltZ: 0, zoom: 1.0, offsetX: -400, offsetY: 0 },
        // Scene 2 – vertical, normal size, CENTRE
        { tiltX: 0, tiltZ: 0, zoom: 1.0, offsetX: 0, offsetY: 0 },
        // Scene 3 – vertical, normal size, RIGHT
        { tiltX: 0, tiltZ: 0, zoom: 1.0, offsetX: 400, offsetY: 0 },
        // Scene 4 – diagonal close-up, mirrored (opposite tilt direction)
        { tiltX: -25, tiltZ: -45, zoom: 2.6, offsetX: 0, offsetY: 0 },
    ];

    private scrollY = 0;
    private nodesA: Node[] = [];
    private nodesB: Node[] = [];
    private animationFrameId: number | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private resizeHandler = () => this.resizeCanvas();
    private hoverSubscription?: Subscription;
    hoverText = signal<string | null>(null);

    // Cache section bounds to avoid expensive DOM queries every frame
    private howItWorksBounds: { top: number; bottom: number } | null = null;
    private boundsUpdateTime = 0;
    private readonly BOUNDS_UPDATE_INTERVAL = 100; // Update bounds every 100ms

    constructor(
        private ngZone: NgZone,
        private dnaHoverService: DnaHoverService
    ) {}

    ngOnInit() {
        // Subscribe to hover text changes
        this.hoverSubscription = this.dnaHoverService.hoverText$.subscribe(text => {
            this.hoverText.set(text);
        });
    }

    ngAfterViewInit() {
        const canvas = this.bondsCanvas?.nativeElement;
        const strandAEl = this.strandA?.nativeElement;
        const strandBEl = this.strandB?.nativeElement;

        if (!canvas || !strandAEl || !strandBEl) return;

        // Setup canvas with performance optimizations
        this.ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: true, // Allow async rendering for smoother scrolling
            willReadFrequently: false // Optimize for write operations
        });
        if (!this.ctx) {
            console.error('Failed to get 2d context from canvas');
            return;
        }
        // Enable image smoothing for better quality
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeHandler);

        // Create strands
        this.createStrand(strandAEl, this.nodesA);
        this.createStrand(strandBEl, this.nodesB);

        // Initialize bounds cache
        this.updateHowItWorksBounds();

        // Start animation loop outside Angular zone for performance
        this.ngZone.runOutsideAngular(() => {
            this.animate(performance.now());
        });
    }

    ngOnDestroy() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', this.resizeHandler);
        this.hoverSubscription?.unsubscribe();
        // Clear cache
        this.howItWorksBounds = null;
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: Event) {
        // Update scrollY directly - the animation loop handles it efficiently
        // Invalidate bounds cache to force update on next check
        this.scrollY = window.scrollY;
        this.howItWorksBounds = null;
    }

    // Update cached bounds for the "how it works" section
    private updateHowItWorksBounds() {
        const howItWorksSection = document.querySelector('app-how-it-works');
        if (howItWorksSection) {
            const rect = howItWorksSection.getBoundingClientRect();
            this.howItWorksBounds = {
                top: rect.top + window.scrollY,
                bottom: rect.top + window.scrollY + rect.height
            };
        } else {
            this.howItWorksBounds = null;
        }
        this.boundsUpdateTime = performance.now();
    }

    private resizeCanvas() {
        const canvas = this.bondsCanvas?.nativeElement;
        if (canvas && this.ctx) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    private createStrand(strand: HTMLElement, nodes: Node[]) {
        for (let i = 0; i < this.COUNT; i++) {
            const el = document.createElement('div');
            el.className = 'word';
            const w = this.WORDS[i % this.WORDS.length];
            el.innerHTML = this.wrapLetterO(w);
            // Initialize with a default transform to prevent layout issues
            el.style.transform = 'translate3d(0, 0, 0) scale(1)';
            strand.appendChild(el);
            // Lock width so translate(-50%) never shifts when glitch changes characters
            el.style.width = el.offsetWidth + 'px';
            nodes.push({
                el,
                index: i,
                originalWord: w,
                matrixCycle: 0,
                lastUpdate: 0,
                isFading: false,
                fadedChars: new Set<number>(),
                builtChars: new Set<number>(),
                fadeStartTime: undefined,
                buildStartTime: undefined
            });
        }
    }

    // Interpolation helpers
    private easeInOut(t: number): number {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    private lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    private getSceneState(progress: number): SceneState {
        const segs = this.SCENES.length - 1;
        const scaled = Math.min(progress * segs, segs - 1e-6);
        const seg = Math.floor(scaled);
        const t = this.easeInOut(scaled - seg);
        const A = this.SCENES[seg];
        const B = this.SCENES[seg + 1];
        return {
            tiltX: this.lerp(A.tiltX, B.tiltX, t),
            tiltZ: this.lerp(A.tiltZ, B.tiltZ, t),
            zoom: this.lerp(A.zoom, B.zoom, t),
            offsetX: this.lerp(A.offsetX, B.offsetX, t),
            offsetY: this.lerp(A.offsetY, B.offsetY, t),
        };
    }

    // 3D rotation helpers
    private rotX(x: number, y: number, z: number, deg: number) {
        const a = deg * Math.PI / 180;
        const c = Math.cos(a);
        const s = Math.sin(a);
        return { x, y: y * c - z * s, z: y * s + z * c };
    }

    private rotZ(x: number, y: number, z: number, deg: number) {
        const a = deg * Math.PI / 180;
        const c = Math.cos(a);
        const s = Math.sin(a);
        return { x: x * c - y * s, y: x * s + y * c, z };
    }

    // Project 3D point to 2D screen
    private project(x: number, y: number, z: number, oX: number, oY: number) {
        const P = 1000;
        const cx = window.innerWidth / 2 + oX;
        const cy = window.innerHeight / 2 + oY;
        const s = P / (P - z);
        return { sx: cx + x * s, sy: cy + y * s };
    }

    // Wrap letter 'o' with span for special coloring
    private wrapLetterO(text: string): string {
        return text.replace(/[oO]/g, (match) => {
            return `<span class="letter-o" style="color: ${this.PAGE_COLOR};">${match}</span>`;
        });
    }

    // Matrix glitch text - handles normal, fade, and build modes
    private matrixText(
        word: string,
        cycle: number,
        intensity: number,
        fadedChars: Set<number>,
        builtChars: Set<number>,
        mode: 'normal' | 'fade' | 'build',
        forceComplete: boolean
    ): string {
        let r = '';

        if (mode === 'normal' && Math.random() > intensity) {
            return this.wrapLetterO(word);
        }

        for (let i = 0; i < word.length; i++) {
            const charId = `char-${i}`;

            // ===== FADE MODE =====
            if (mode === 'fade') {
                if (fadedChars.has(i)) {
                    r += `<span data-char-id="${charId}" style="opacity:0">${word[i]}</span>`;
                    continue;
                }

                const glitch =
                    Math.random() < 0.25 * intensity
                        ? this.getGlitchChar()
                        : word[i];

                if (glitch !== word[i]) {
                    fadedChars.add(i);
                    r += `<span data-char-id="${charId}" style="opacity:0">${word[i]}</span>`;
                    continue;
                }

                if (forceComplete) {
                    fadedChars.add(i);
                    r += `<span data-char-id="${charId}" style="opacity:0">${word[i]}</span>`;
                    continue;
                }

                r += `<span data-char-id="${charId}">${word[i]}</span>`;
                continue;
            }

            // ===== BUILD MODE =====
            if (mode === 'build') {
                if (!builtChars.has(i)) {
                    const glitch =
                        Math.random() < 0.25 * intensity
                            ? this.getGlitchChar()
                            : '';

                    if (glitch && glitch !== word[i]) {
                        builtChars.add(i);
                        if (word[i].toLowerCase() === 'o') {
                            r += `<span class="letter-o" data-char-id="${charId}" style="color: ${this.PAGE_COLOR}">${word[i]}</span>`;
                        } else {
                            r += `<span data-char-id="${charId}">${word[i]}</span>`;
                        }
                        continue;
                    }

                    if (forceComplete) {
                        builtChars.add(i);
                        if (word[i].toLowerCase() === 'o') {
                            r += `<span class="letter-o" data-char-id="${charId}" style="color: ${this.PAGE_COLOR}">${word[i]}</span>`;
                        } else {
                            r += `<span data-char-id="${charId}">${word[i]}</span>`;
                        }
                        continue;
                    }

                    r += `<span data-char-id="${charId}" style="opacity:0">${word[i]}</span>`;
                    continue;
                }

                if (word[i].toLowerCase() === 'o') {
                    r += `<span class="letter-o" data-char-id="${charId}" style="color: ${this.PAGE_COLOR}">${word[i]}</span>`;
                } else {
                    r += `<span data-char-id="${charId}">${word[i]}</span>`;
                }
                continue;
            }

            // ===== NORMAL =====
            const glitch =
                Math.random() < 0.25 * intensity
                    ? this.getGlitchChar()
                    : word[i];

            if (glitch.toLowerCase() === 'o') {
                r += `<span class="letter-o" data-char-id="${charId}" style="color: ${this.PAGE_COLOR}">${glitch}</span>`;
            } else {
                r += `<span data-char-id="${charId}">${glitch}</span>`;
            }
        }

        return r;
    }


    // Seeded pseudo-random (deterministic per bond index)
    private seededRand(seed: number): number {
        const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
        return x - Math.floor(x);
    }

    // Draw one leaf (teardrop shape)
    private drawLeaf(cx: number, cy: number, angle: number, size: number, alpha: number) {
        if (!this.ctx) return;

        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(angle);

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(
            size * 0.6, -size * 0.4,
            size * 1.1, -size * 0.2,
            size * 1.2, 0
        );
        this.ctx.bezierCurveTo(
            size * 1.1, size * 0.2,
            size * 0.6, size * 0.4,
            0, 0
        );

        const leafGrad = this.ctx.createLinearGradient(0, 0, size * 1.2, 0);
        leafGrad.addColorStop(0, `rgba(60, 120, 35, ${alpha * 0.7})`);
        leafGrad.addColorStop(0.4, `rgba(100, 175, 55, ${alpha})`);
        leafGrad.addColorStop(1, `rgba(140, 200, 80, ${alpha * 0.55})`);
        this.ctx.fillStyle = leafGrad;
        this.ctx.fill();

        // midrib vein
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(size * 1.1, 0);
        this.ctx.strokeStyle = `rgba(40, 85, 25, ${alpha * 0.45})`;
        this.ctx.lineWidth = 0.4;
        this.ctx.stroke();

        this.ctx.restore();
    }

    // Draw one branch (main trunk + twigs + leaves)
    private drawBranch(x1: number, y1: number, x2: number, y2: number, alpha: number, seed: number) {
        if (!this.ctx) return;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        const perpX = -dy / len;
        const perpY = dx / len;

        // organic droop/bow
        const droop = (this.seededRand(seed) - 0.3) * len * 0.18;
        const cpX = (x1 + x2) / 2 + perpX * droop;
        const cpY = (y1 + y2) / 2 + perpY * droop;

        // tapered branch trunk
        const baseW = Math.max(0.2, len * 0.006);
        const tipW = Math.max(0.08, baseW * 0.25);
        const offL = perpX * baseW;
        const offR = -perpX * baseW;
        const offLt = perpX * tipW;
        const offRt = -perpX * tipW;

        this.ctx.beginPath();
        this.ctx.moveTo(x1 + offL, y1 + perpY * baseW);
        this.ctx.quadraticCurveTo(cpX + offL, cpY + perpY * baseW, x2 + offLt, y2 + perpY * tipW);
        this.ctx.lineTo(x2 + offRt, y2 - perpY * tipW);
        this.ctx.quadraticCurveTo(cpX + offR, cpY - perpY * baseW, x1 + offR, y1 - perpY * baseW);
        this.ctx.closePath();

        const trunkGrad = this.ctx.createLinearGradient(x1, y1, x2, y2);
        trunkGrad.addColorStop(0, `rgba(60, 100, 35, ${alpha * 0.9})`);
        trunkGrad.addColorStop(0.5, `rgba(80, 130, 50, ${alpha})`);
        trunkGrad.addColorStop(1, `rgba(50, 90, 30, ${alpha * 0.7})`);
        this.ctx.fillStyle = trunkGrad;
        this.ctx.fill();

        // side twigs + leaves
        const TWIG_COUNT = 3 + Math.floor(this.seededRand(seed + 0.5) * 3);

        for (let t = 0; t < TWIG_COUNT; t++) {
            const frac = 0.15 + (t / (TWIG_COUNT - 1)) * 0.7;

            // point on quadratic bezier
            const bx = (1 - frac) * (1 - frac) * x1 + 2 * (1 - frac) * frac * cpX + frac * frac * x2;
            const by = (1 - frac) * (1 - frac) * y1 + 2 * (1 - frac) * frac * cpY + frac * frac * y2;

            // tangent direction at that point
            const tx = 2 * (1 - frac) * (cpX - x1) + 2 * frac * (x2 - cpX);
            const ty = 2 * (1 - frac) * (cpY - y1) + 2 * frac * (y2 - cpY);
            const tang = Math.atan2(ty, tx);

            const side = t % 2 === 0 ? 1 : -1;
            const spread = (0.4 + this.seededRand(seed + t * 3.7) * 0.4) * side;
            const twigAng = tang + spread;
            const twigLen = len * (0.12 + this.seededRand(seed + t * 1.9) * 0.14);

            const tx2 = bx + Math.cos(twigAng) * twigLen;
            const ty2 = by + Math.sin(twigAng) * twigLen;

            this.ctx.beginPath();
            this.ctx.moveTo(bx, by);
            this.ctx.lineTo(tx2, ty2);
            this.ctx.strokeStyle = `rgba(55, 95, 35, ${alpha * 0.7})`;
            this.ctx.lineWidth = Math.max(0.2, baseW * 0.18);
            this.ctx.lineCap = 'round';
            this.ctx.stroke();

            const leafSize = len * (0.025 + this.seededRand(seed + t * 5.1) * 0.015);
            const leafAlpha = alpha * (0.6 + this.seededRand(seed + t * 2.3) * 0.4);
            const leafAngle = twigAng + (this.seededRand(seed + t * 7.3) - 0.5) * 0.5;
            this.drawLeaf(tx2, ty2, leafAngle, leafSize, leafAlpha);

            if (twigLen > len * 0.18) {
                const mx = bx + Math.cos(twigAng) * twigLen * 0.5;
                const my = by + Math.sin(twigAng) * twigLen * 0.5;
                this.drawLeaf(mx, my, leafAngle + 0.6 * side, leafSize * 0.55, leafAlpha * 0.7);
            }
        }

        // leaves directly on main branch
        const TRUNK_LEAVES = 2 + Math.floor(this.seededRand(seed + 9.1) * 2);
        for (let l = 0; l < TRUNK_LEAVES; l++) {
            const frac = 0.2 + (l / TRUNK_LEAVES) * 0.6;
            const lx = (1 - frac) * (1 - frac) * x1 + 2 * (1 - frac) * frac * cpX + frac * frac * x2;
            const ly = (1 - frac) * (1 - frac) * y1 + 2 * (1 - frac) * frac * cpY + frac * frac * y2;
            const side = l % 2 === 0 ? 1 : -1;
            const leafAngle = angle + (0.9 + this.seededRand(seed + l * 4.4) * 0.5) * side;
            const leafSize = len * (0.022 + this.seededRand(seed + l * 6.6) * 0.015);
            this.drawLeaf(lx, ly, leafAngle, leafSize, alpha * 0.65);
        }
    }

    private animate(ts: number) {
        if (!this.ctx || !this.bondsCanvas?.nativeElement) {
            this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
            return;
        }

        const totalH = document.body.scrollHeight - window.innerHeight;
        const progress = totalH > 0 ? Math.min(this.scrollY / totalH, 1) : 0;
        const scene = this.getSceneState(progress);
        const spinT = this.scrollY * this.SPEED;
        const R = this.RADIUS * scene.zoom;
        const SP = this.SPACING * scene.zoom;

        this.ctx.clearRect(0, 0, this.bondsCanvas.nativeElement.width, this.bondsCanvas.nativeElement.height);

        // Update cached bounds periodically (not every frame)
        if (!this.howItWorksBounds || (ts - this.boundsUpdateTime > this.BOUNDS_UPDATE_INTERVAL)) {
            this.updateHowItWorksBounds();
        }

        // Hide middle words only in the "how it works" section when description card is showing
        // Keep top and bottom words visible - use cached bounds
        // Don't hide words on mobile devices (screen width <= 1023px)
        const isMobile = window.innerWidth <= 1023;
        let isInHowItWorksSection = false;
        if (this.howItWorksBounds) {
            // Check if current scroll position is within the section bounds
            isInHowItWorksSection = this.scrollY >= this.howItWorksBounds.top - window.innerHeight &&
                                   this.scrollY <= this.howItWorksBounds.bottom + window.innerHeight;
        }
        const shouldHideMiddleWords = !isMobile && isInHowItWorksSection && this.hoverText() !== null;

        // Define the range of indices to hide (exactly the middle portion)
        // Keep top 25% and bottom 25% visible, hide middle 50%
        const hideStartIndex = Math.floor(this.COUNT * 0.13); // Start hiding after top 25%
        const hideEndIndex = Math.floor(this.COUNT * 0.30);   // Stop hiding at bottom 25%

        for (let i = 0; i < this.COUNT; i++) {
            const a = this.nodesA[i];
            const b = this.nodesB[i];

            // base helix geometry (vertical, centred)
            const angA = i * 0.35 + spinT;
            const angB = angA + Math.PI;
            const yBase = i * SP - (this.COUNT * SP) / 2;

            // apply scene tilt: first X then Z
            let rA = this.rotX(Math.cos(angA) * R, yBase, Math.sin(angA) * R, scene.tiltX);
            rA = this.rotZ(rA.x, rA.y, rA.z, scene.tiltZ);
            let rB = this.rotX(Math.cos(angB) * R, yBase, Math.sin(angB) * R, scene.tiltX);
            rB = this.rotZ(rB.x, rB.y, rB.z, scene.tiltZ);

            const ax = rA.x;
            const ay = rA.y;
            const az = rA.z;
            const bx = rB.x;
            const by = rB.y;
            const bz = rB.z;

            // depth (calculate after geometry to get baseOpacity)
            const dA = (az + this.RADIUS) / (this.RADIUS * 2);
            const dB = (bz + this.RADIUS) / (this.RADIUS * 2);

            // Hide middle words when description card is showing, keep top and bottom visible
            const shouldHideThisWord = shouldHideMiddleWords && i >= hideStartIndex && i < hideEndIndex;

            // ---- FADE ----
            if (shouldHideThisWord && !a.isFading) {
                a.isFading = true;
                a.fadeStartTime = ts;
                a.fadedChars.clear();
                a.builtChars.clear();
            }

            // ---- BUILD ----
            if (!shouldHideThisWord && a.isFading && a.buildStartTime === undefined) {
                a.isFading = false;
                a.buildStartTime = ts;
                a.builtChars.clear();
            }

            let modeA: 'normal' | 'fade' | 'build' = 'normal';
            let forceCompleteA = false;

            if (a.isFading) {
                modeA = 'fade';
                forceCompleteA =
                    a.fadeStartTime !== undefined &&
                    ts - a.fadeStartTime > this.FORCE_HIDE_AFTER;
            } else if (a.buildStartTime !== undefined) {
                modeA = 'build';
                forceCompleteA = ts - a.buildStartTime > this.FORCE_BUILD_AFTER;
            }

            // Update text
            if (ts - a.lastUpdate > 60) {
                a.matrixCycle++;
                const intensity = 0.25 + (Math.sin(a.matrixCycle * 0.1) + 1) * 0.3;
                // Preserve width to prevent jumping
                const savedWidth = a.el.style.width;
                a.el.innerHTML = this.matrixText(
                    a.originalWord,
                    a.matrixCycle,
                    intensity,
                    a.fadedChars,
                    a.builtChars,
                    modeA,
                    forceCompleteA
                );
                // Restore width to prevent layout shifts
                if (savedWidth) {
                    a.el.style.width = savedWidth;
                }
                a.lastUpdate = ts;
            }

            // Finish build - reset to normal mode
            if (modeA === 'build' && forceCompleteA) {
                a.buildStartTime = undefined;
                a.fadeStartTime = undefined;
                a.fadedChars.clear();
                a.builtChars.clear();
                // Reset to normal text to ensure clean state - preserve width
                const savedWidth = a.el.style.width;
                a.el.innerHTML = this.matrixText(
                    a.originalWord,
                    a.matrixCycle,
                    0.25 + (Math.sin(a.matrixCycle * 0.1) + 1) * 0.3,
                    a.fadedChars,
                    a.builtChars,
                    'normal',
                    false
                );
                if (savedWidth) {
                    a.el.style.width = savedWidth;
                }
            }

            a.el.style.transform = `translate3d(${ax.toFixed(2)}px,${ay.toFixed(2)}px,${az.toFixed(2)}px) translate(-50%,-50%) scale(${(0.5 + dA * 0.8).toFixed(3)})`;
            // Set base opacity on element only when NOT fading or building (prevents opacity multiplication)
            if (modeA === 'normal') {
                a.el.style.opacity = String(0.25 + dA * 0.55);
            }
            // Use amber color with depth-based variation
            const amberR = 196 - (1 - dA) * 30; // 196 to 166
            const amberG = 150 - (1 - dA) * 25; // 150 to 125
            const amberB = 74 - (1 - dA) * 15;  // 74 to 59
            a.el.style.color = `rgb(${amberR | 0},${amberG | 0},${amberB | 0})`;
            // Update 'o' letter colors to page color
            const aOElements = a.el.querySelectorAll('.letter-o');
            aOElements.forEach((span) => {
                (span as HTMLElement).style.color = this.PAGE_COLOR;
            });

            // ---- FADE ----
            if (shouldHideThisWord && !b.isFading) {
                b.isFading = true;
                b.fadeStartTime = ts;
                b.fadedChars.clear();
                b.builtChars.clear();
            }

            // ---- BUILD ----
            if (!shouldHideThisWord && b.isFading && b.buildStartTime === undefined) {
                b.isFading = false;
                b.buildStartTime = ts;
                b.builtChars.clear();
            }

            let modeB: 'normal' | 'fade' | 'build' = 'normal';
            let forceCompleteB = false;

            if (b.isFading) {
                modeB = 'fade';
                forceCompleteB =
                    b.fadeStartTime !== undefined &&
                    ts - b.fadeStartTime > this.FORCE_HIDE_AFTER;
            } else if (b.buildStartTime !== undefined) {
                modeB = 'build';
                forceCompleteB = ts - b.buildStartTime > this.FORCE_BUILD_AFTER;
            }

            // Update text
            if (ts - b.lastUpdate > 60) {
                b.matrixCycle++;
                const intensity = 0.25 + (Math.sin(b.matrixCycle * 0.1) + 1) * 0.3;
                // Preserve width to prevent jumping
                const savedWidth = b.el.style.width;
                b.el.innerHTML = this.matrixText(
                    b.originalWord,
                    b.matrixCycle,
                    intensity,
                    b.fadedChars,
                    b.builtChars,
                    modeB,
                    forceCompleteB
                );
                // Restore width to prevent layout shifts
                if (savedWidth) {
                    b.el.style.width = savedWidth;
                }
                b.lastUpdate = ts;
            }

            // Finish build - reset to normal mode
            if (modeB === 'build' && forceCompleteB) {
                b.buildStartTime = undefined;
                b.fadeStartTime = undefined;
                b.fadedChars.clear();
                b.builtChars.clear();
                // Reset to normal text to ensure clean state - preserve width
                const savedWidth = b.el.style.width;
                b.el.innerHTML = this.matrixText(
                    b.originalWord,
                    b.matrixCycle,
                    0.25 + (Math.sin(b.matrixCycle * 0.1) + 1) * 0.3,
                    b.fadedChars,
                    b.builtChars,
                    'normal',
                    false
                );
                if (savedWidth) {
                    b.el.style.width = savedWidth;
                }
            }

            b.el.style.transform = `translate3d(${bx.toFixed(2)}px,${by.toFixed(2)}px,${bz.toFixed(2)}px) translate(-50%,-50%) scale(${(0.5 + dB * 0.8).toFixed(3)})`;
            // Set base opacity on element only when NOT fading or building (prevents opacity multiplication)
            if (modeB === 'normal') {
                b.el.style.opacity = String(0.25 + dB * 0.55);
            }
            // Use amber color with depth-based variation
            const amberR2 = 196 - (1 - dB) * 30; // 196 to 166
            const amberG2 = 150 - (1 - dB) * 25; // 150 to 125
            const amberB2 = 74 - (1 - dB) * 15;  // 74 to 59
            b.el.style.color = `rgb(${amberR2 | 0},${amberG2 | 0},${amberB2 | 0})`;
            // Update 'o' letter colors to page color
            const bOElements = b.el.querySelectorAll('.letter-o');
            bOElements.forEach((span) => {
                (span as HTMLElement).style.color = this.PAGE_COLOR;
            });

            // canvas bond — drawn as organic branch with leaves
            const pA = this.project(ax, ay, az, scene.offsetX, scene.offsetY);
            const pB = this.project(bx, by, bz, scene.offsetX, scene.offsetY);

            if (pA.sy < -60 || pA.sy > this.bondsCanvas.nativeElement.height + 60) continue;

            const deg = Math.abs(Math.atan2(pA.sy - pB.sy, pA.sx - pB.sx) * 180 / Math.PI);
            if (deg > 20 && deg < 160) continue;

            const depth = ((az + bz) / 2 + this.RADIUS) / (this.RADIUS * 2);
            const bAlpha = Math.min(0.6, Math.max(0.15, 0.2 + depth * 0.4));

            this.drawBranch(pB.sx, pB.sy, pA.sx, pA.sy, bAlpha, i);
        }

        // shift strand containers to match scene offset
        const sl = `calc(50% + ${scene.offsetX}px)`;
        const st = `calc(50% + ${scene.offsetY}px)`;
        if (this.strandA?.nativeElement && this.strandB?.nativeElement) {
            this.strandA.nativeElement.style.left = this.strandB.nativeElement.style.left = sl;
            this.strandA.nativeElement.style.top = this.strandB.nativeElement.style.top = st;
        }

        this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
    }
}

