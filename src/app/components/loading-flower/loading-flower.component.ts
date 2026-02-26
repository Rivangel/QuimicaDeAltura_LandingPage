import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';

const BASE_X = 200;
const BASE_Y = 360;
const ARC_CX = 200;
const ARC_CY = 260;
const ARC_R = 110;
const DUR = 5000;

function cubicB(p: number, p0: number, p1: number, p2: number, p3: number): number {
  const ip = 1 - p;
  return ip * ip * ip * p0 + 3 * ip * ip * p * p1 + 3 * ip * p * p * p2 + p * p * p * p3;
}

@Component({
  selector: 'app-loading-flower',
  standalone: true,
  imports: [],
  templateUrl: './loading-flower.component.html',
  styleUrl: './loading-flower.component.scss',
})
export class LoadingFlowerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('svgEl') private svgRef!: ElementRef<SVGSVGElement>;
  @ViewChild('sunEl') private sunRef!: ElementRef<SVGGElement>;
  @ViewChild('raysEl') private raysRef!: ElementRef<SVGGElement>;
  @ViewChild('stemEl') private stemRef!: ElementRef<SVGPathElement>;
  @ViewChild('leafLEl') private leafLRef!: ElementRef<SVGGElement>;
  @ViewChild('leafREl') private leafRRef!: ElementRef<SVGGElement>;
  @ViewChild('flowerEl') private flowerRef!: ElementRef<SVGGElement>;

  private rafId: number | null = null;
  private prevFlowerT = 0.5;
  private flowerVel = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => this.startAnimation());
  }

  ngOnDestroy(): void {
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
  }

  private startAnimation(): void {
    const sun = this.sunRef?.nativeElement;
    const rays = this.raysRef?.nativeElement;
    const stem = this.stemRef?.nativeElement;
    const leafL = this.leafLRef?.nativeElement;
    const leafR = this.leafRRef?.nativeElement;
    const flower = this.flowerRef?.nativeElement;
    if (!sun || !stem || !leafL || !leafR || !flower) return;

    const tick = (ts: number) => {
      const raw = (ts % DUR) / DUR;
      const t = 0.5 - 0.5 * Math.cos(raw * 2 * Math.PI);

      // Sun position along arc
      const sunAngle = Math.PI * (1 - t);
      const sunX = ARC_CX + ARC_R * Math.cos(sunAngle);
      const sunY = ARC_CY - ARC_R * Math.sin(sunAngle);
      sun.setAttribute('transform', `translate(${sunX},${sunY})`);

      // Rays: slow rotation + subtle pulse
      if (rays) {
        const rayRot = (ts * 0.04) % 360;
        const rayPulse = 0.35 + 0.15 * Math.sin(ts * 0.003);
        rays.setAttribute('transform', `rotate(${rayRot})`);
        rays.setAttribute('opacity', rayPulse.toFixed(2));
      }

      // Flower: lags behind sun with spring-like inertia
      const targetT = t;
      const springK = 0.04;
      const damping = 0.82;
      this.flowerVel = (this.flowerVel + (targetT - this.prevFlowerT) * springK) * damping;
      this.prevFlowerT = this.prevFlowerT + this.flowerVel;
      const ft = Math.max(0, Math.min(1, this.prevFlowerT));

      const sway = (ft - 0.5) * 80;
      const heightCos = Math.cos((ft - 0.5) * Math.PI);
      const stemTopX = BASE_X + sway;
      const stemTopY = 280 - heightCos * 35;

      const c1x = BASE_X - sway * 0.4;
      const c1y = BASE_Y - 30;
      const c2x = BASE_X + sway * 1.1;
      const c2y = stemTopY + 25;
      stem.setAttribute(
        'd',
        `M${BASE_X},${BASE_Y} C${c1x},${c1y} ${c2x},${c2y} ${stemTopX},${stemTopY}`
      );

      const tiltDeg = (ft - 0.5) * 45;
      const bob = Math.sin(ts * 0.004) * 2.5 + Math.sin(ts * 0.0067) * 1.5;
      const headScale = 1 + Math.sin(ts * 0.0025) * 0.03;
      flower.setAttribute(
        'transform',
        `translate(${stemTopX},${stemTopY + bob}) rotate(${tiltDeg}) scale(${headScale.toFixed(3)})`
      );

      const flutterL = Math.sin(ts * 0.004) * 15 + Math.sin(ts * 0.0095) * 8;
      const flutterR = Math.sin(ts * 0.005 + 2) * 15 + Math.sin(ts * 0.011 + 1) * 8;

      const lp = 0.3;
      const lx = cubicB(lp, BASE_X, c1x, c2x, stemTopX);
      const ly = cubicB(lp, BASE_Y, c1y, c2y, stemTopY);
      leafL.setAttribute('transform', `translate(${lx},${ly}) rotate(${flutterL - 10})`);

      const rp = 0.55;
      const rx = cubicB(rp, BASE_X, c1x, c2x, stemTopX);
      const ry = cubicB(rp, BASE_Y, c1y, c2y, stemTopY);
      leafR.setAttribute('transform', `translate(${rx},${ry}) rotate(${flutterR + 10})`);

      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }
}
