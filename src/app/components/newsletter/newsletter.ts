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
  errorMessage = signal('');
  private observer: IntersectionObserver | null = null;

  private readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.visible.set(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  onSubmit() {
    // Clear previous error
    this.errorMessage.set('');

    if (!this.email || this.email.trim() === '') {
      this.errorMessage.set('Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (!this.EMAIL_REGEX.test(this.email.trim())) {
      this.errorMessage.set('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    this.submitted.set(true);
    this.email = '';
  }

  clearError() {
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }
}
