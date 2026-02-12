import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials implements AfterViewInit, OnDestroy {
  @ViewChild('grid') gridRef!: ElementRef<HTMLElement>;

  visible = signal(false);
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  testimonials = [
    {
      avatar: '👨🏽‍🔬',
      quote: 'Esta aplicación es una herramienta invaluable para mi investigación. La precisión en el análisis de compuestos orgánicos de las plantas medicinales me permite identificar rápidamente moléculas con potencial terapéutico.',
      name: 'Dr. Alan Carrasco Carballo',
      role: 'Investigador en Química Orgánica',
      location: 'Puebla'
    },
    {
      avatar: '👩🏽‍🔬',
      quote: 'Uso esta aplicación en mis clases de microbiología para mostrar a mis estudiantes cómo las plantas medicinales tienen propiedades antimicrobianas validadas científicamente. Es una herramienta excelente para conectar el conocimiento tradicional con la evidencia científica.',
      name: 'M en C Diana Flores Percino',
      role: 'Investigadora en Microbiología',
      location: 'Puebla'
    },
    {
      avatar: '👩🏽‍🔬',
      quote: 'La biotecnología y la medicina tradicional se complementan perfectamente en esta aplicación. Es fascinante ver cómo la tecnología puede preservar y potenciar el conocimiento ancestral sobre plantas medicinales.',
      name: 'Saraluz Soto Ortiz',
      role: 'Licenciada en Biotecnología',
      location: 'Veracruz'
    }
  ];

  ngAfterViewInit() {
    const el = this.gridRef.nativeElement;
    el.style.height = el.offsetHeight + 'px';

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
}
