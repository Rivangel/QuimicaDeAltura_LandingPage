import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  imports: [],
  templateUrl: './sponsors.html',
  styleUrl: './sponsors.scss',
})
export class Sponsors implements AfterViewInit, OnDestroy {
  visible = signal(false);
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  sponsors = [
    { name: 'CONACYT', fullName: 'Consejo Nacional de Ciencia y Tecnologia' },
    { name: 'UV', fullName: 'Universidad Veracruzana' },
    { name: 'TECNM', fullName: 'Tecnologico Nacional de Mexico' },
    { name: 'GOB. VER.', fullName: 'Gobierno del Estado de Veracruz' },
  ];

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
