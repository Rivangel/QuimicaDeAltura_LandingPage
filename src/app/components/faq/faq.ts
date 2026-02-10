import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  openIndex = signal<number | null>(null);

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
      a: 'La versión básica es completamente gratuita e incluye acceso al catálogo de plantas y recomendaciones generales. Para análisis avanzados con IA y consultorías personalizadas, ofrecemos planes de suscripción accesibles.'
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
}
