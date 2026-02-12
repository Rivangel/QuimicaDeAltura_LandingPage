import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq implements AfterViewInit, OnDestroy {
  openIndex = signal<number | null>(null);
  visible = signal(false);
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  questions = [
    {
      q: '¿Cómo analiza la IA las plantas medicinales?',
      a: 'Nuestra inteligencia artificial utiliza modelos de aprendizaje profundo entrenados con bases de datos etnobotánicas y estudios fitoquímicos. Analiza imágenes de plantas, cruza información con compuestos activos conocidos y ofrece recomendaciones basadas en evidencia científica y conocimiento tradicional.'
    },
    {
      q: '¿La información está validada científicamente?',
      a: 'Sí. Toda la información se respalda con investigaciones publicadas en revistas científicas y con el conocimiento de comunidades indígenas y rurales de las Altas Montañas de Veracruz. Nuestro equipo incluye investigadores en química, biología y etnobotánica.'
    },
    {
      q: '¿La aplicación es gratuita?',
      a: 'Sí, nuestra aplicación es completamente gratuita para todos los usuarios. Tienes acceso completo a toda la información sobre plantas medicinales, análisis con IA y todas las funcionalidades sin costo alguno. Trabajamos con empresas que venden plantas medicinales y te conectamos con ellas si necesitas adquirir alguna planta.'
    },
    {
      q: '¿Qué región geográfica cubre la aplicación?',
      a: 'Actualmente nos enfocamos en la flora medicinal de la región de las Altas Montañas de Veracruz, México, con especial énfasis en las zonas de Córdoba, Orizaba y sus alrededores. Planeamos expandirnos a otras regiones de México.'
    },
    {
      q: '¿Cómo se preserva el conocimiento tradicional?',
      a: 'Trabajamos directamente con comunidades indígenas y rurales para documentar y digitalizar sus conocimientos etnobotánicos. Todo el contenido se registra con el consentimiento de las comunidades y se les reconoce como fuente del saber tradicional.'
    }
  ];

  toggle(index: number) {
    this.openIndex.update(current => current === index ? null : index);
  }

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
