import { Component, AfterViewInit, OnDestroy, HostListener, NgZone } from '@angular/core';

@Component({
  selector: 'app-falling-leaves-front',
  standalone: true,
  imports: [],
  templateUrl: './falling-leaves-front.html',
  styleUrl: './falling-leaves-front.scss'
})
export class FallingLeavesFront implements AfterViewInit, OnDestroy {
  private mouseX = -9999;
  private mouseY = -9999;
  private leafPushRAF: number | null = null;
  private readonly PUSH_RADIUS = 120;  // how close before push starts (px)
  private readonly PUSH_STRENGTH = 80; // max push distance (px)

  constructor(private ngZone: NgZone) { }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  ngAfterViewInit() {
    // Start leaf push loop outside Angular zone (no change detection needed)
    this.ngZone.runOutsideAngular(() => this.pushLeavesLoop());
  }

  ngOnDestroy() {
    if (this.leafPushRAF !== null) {
      cancelAnimationFrame(this.leafPushRAF);
    }
  }

  private pushLeavesLoop() {
    const leaves = document.querySelectorAll<HTMLElement>('.falling-leaves-front .falling-leaf-front');

    const tick = () => {
      leaves.forEach(leaf => {
        const rect = leaf.getBoundingClientRect();
        const leafCX = rect.left + rect.width / 2;
        const leafCY = rect.top + rect.height / 2;
        const dx = leafCX - this.mouseX;
        const dy = leafCY - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.PUSH_RADIUS && dist > 0) {
          // Closer = stronger push, direction away from mouse
          const force = (1 - dist / this.PUSH_RADIUS) * this.PUSH_STRENGTH;
          const pushX = (dx / dist) * force;
          const pushY = (dy / dist) * force;
          leaf.style.setProperty('--push-x', pushX + 'px');
          leaf.style.setProperty('--push-y', pushY + 'px');
        } else {
          leaf.style.setProperty('--push-x', '0px');
          leaf.style.setProperty('--push-y', '0px');
        }
      });

      this.leafPushRAF = requestAnimationFrame(tick);
    };

    this.leafPushRAF = requestAnimationFrame(tick);
  }
}
