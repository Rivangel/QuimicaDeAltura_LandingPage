import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-cta-banner',
  imports: [],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
})
export class CtaBanner implements AfterViewInit, OnDestroy {
  visible = signal(false);
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
