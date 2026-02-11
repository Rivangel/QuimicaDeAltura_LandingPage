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
      avatar: '👩🏽‍🌾',
      quote: 'Gracias a esta app pude identificar plantas que mi abuela usaba y que yo ya habia olvidado. Ahora las cultivo en mi jardin.',
      name: 'Maria Elena',
      role: 'Herbolaria comunitaria',
      location: 'Orizaba, Veracruz'
    },
    {
      avatar: '👨🏽‍🔬',
      quote: 'Como investigador, la precision de la IA me sorprendio. Es una herramienta invaluable para documentar la etnobotanica regional.',
      name: 'Dr. Carlos Mendez',
      role: 'Investigador en Fitoquimica',
      location: 'Cordoba, Veracruz'
    },
    {
      avatar: '👩🏽‍🏫',
      quote: 'Mis estudiantes usan la app en las salidas de campo. Les encanta escanear plantas y aprender sobre sus usos medicinales.',
      name: 'Prof. Laura Hernandez',
      role: 'Docente de Biologia',
      location: 'Fortín, Veracruz'
    }
  ];

  ngAfterViewInit() {
    const el = this.gridRef.nativeElement;
    el.style.height = el.offsetHeight + 'px';
  }
}
