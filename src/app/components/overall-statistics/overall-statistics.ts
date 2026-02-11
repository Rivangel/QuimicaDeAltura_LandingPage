import { Component, signal, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-overall-statistics',
  imports: [],
  templateUrl: './overall-statistics.html',
  styleUrl: './overall-statistics.scss',
})
export class OverallStatistics implements AfterViewInit, OnDestroy {
  @ViewChild('statsSection') statsSection!: ElementRef<HTMLElement>;

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;
  private animationFrameIds: number[] = [];

  stats = [
    { target: 500, suffix: '+', label: 'Plantas Catalogadas', icon: '🌱', current: signal(0) },
    { target: 95, suffix: '%', label: 'Precision IA', icon: '🤖', current: signal(0) },
    { target: 10000, suffix: '+', label: 'Usuarios', icon: '👥', current: signal(0) },
    { target: 15, suffix: '', label: 'Comunidades', icon: '🏘️', current: signal(0) },
  ];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );
    this.observer.observe(this.statsSection.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.animationFrameIds.forEach((id) => cancelAnimationFrame(id));
  }

  private animateCounters() {
    const duration = 2000;

    this.stats.forEach((stat) => {
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        stat.current.set(Math.round(eased * stat.target));

        if (progress < 1) {
          const id = requestAnimationFrame(animate);
          this.animationFrameIds.push(id);
        }
      };

      const id = requestAnimationFrame(animate);
      this.animationFrameIds.push(id);
    });
  }

  formatValue(stat: { target: number; suffix: string; current: ReturnType<typeof signal<number>> }): string {
    const value = stat.current();
    if (stat.target >= 10000) {
      return value.toLocaleString() + stat.suffix;
    }
    return value + stat.suffix;
  }
}
