import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { DnaHoverService } from '../../services/dna-hover.service';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
})
export class HowItWorks implements AfterViewInit, OnDestroy {
  visible = signal(false);
  hoveredDescription = signal<string | null>(null);
  animatedDescription = signal<string>('');
  private observer: IntersectionObserver | null = null;
  private animationFrameId: number | null = null;

  steps = [
    {
      number: 1,
      icon: '📲',
      title: 'Descarga la App',
      description: 'Disponible gratis en Google Play y App Store. Instalala en segundos y comienza a descubrir plantas medicinales.'
    },
    {
      number: 2,
      icon: '🔍',
      title: 'Escanea una Planta',
      description: 'Usa la camara de tu telefono para identificar plantas medicinales con nuestra IA avanzada.'
    },
    {
      number: 3,
      icon: '🌿',
      title: 'Descubre sus Beneficios',
      description: 'Recibe informacion detallada sobre propiedades, usos tradicionales y evidencia cientifica.'
    }
  ];

  constructor(
    private el: ElementRef,
    private dnaHoverService: DnaHoverService
  ) {}

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
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  onCardHover(description: string): void {
    // Only show description card and hide DNA words on desktop (not mobile)
    const isMobile = window.innerWidth <= 1023;
    if (isMobile) {
      return; // Don't trigger hover effects on mobile
    }
    
    // Clear any existing animation first
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    this.hoveredDescription.set(description);
    this.animateDescription(description);
    this.dnaHoverService.setHoverText(description); // Signal to hide DNA words
  }

  onCardLeave(): void {
    // Only clear hover effects on desktop (not mobile)
    const isMobile = window.innerWidth <= 1023;
    if (isMobile) {
      return; // Don't trigger hover effects on mobile
    }
    
    // Always clear hover state, even if already null
    this.hoveredDescription.set(null);
    this.animatedDescription.set('');
    this.dnaHoverService.setHoverText(null); // Signal to show DNA words again
    
    // Cancel any ongoing animation
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private animateDescription(text: string): void {
    if (!text) return;
    
    // Reset animated text
    this.animatedDescription.set('');
    
    const duration = Math.min(text.length * 20, 1500); // Max 1.5 seconds
    const startTime = performance.now();
    const totalChars = text.length;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      const charsToShow = Math.round(eased * totalChars);
      this.animatedDescription.set(text.substring(0, charsToShow));

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.animationFrameId = null;
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
