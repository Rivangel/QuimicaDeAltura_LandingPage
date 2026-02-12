import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.scss',
})
export class Newsletter implements AfterViewInit, OnDestroy {
  visible = signal(false);
  email = '';
  submitted = signal(false);
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

  onSubmit() {
    if (this.email) {
      this.submitted.set(true);
      this.email = '';
    }
  }
}
