import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials implements AfterViewInit {
  @ViewChild('grid') gridRef!: ElementRef<HTMLElement>;

  testimonials = [
    {
      avatar: '👨🏽‍🔬',
      quote: 'Esta aplicación es una herramienta invaluable para mi investigación. La precisión en el análisis de compuestos orgánicos de las plantas medicinales me permite identificar rápidamente moléculas con potencial terapéutico.',
      name: 'Dr. Alan Carrasco Carballo',
      role: 'Investigador en Química Orgánica',
      location: 'Veracruz'
    },
    {
      avatar: '👩🏽‍🔬',
      quote: 'Uso esta aplicación en mis clases de microbiología para mostrar a mis estudiantes cómo las plantas medicinales tienen propiedades antimicrobianas validadas científicamente. Es una herramienta excelente para conectar el conocimiento tradicional con la evidencia científica.',
      name: 'M en C Diana Flores Percino',
      role: 'Investigadora en Microbiología',
      location: 'Veracruz'
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
  }
}
