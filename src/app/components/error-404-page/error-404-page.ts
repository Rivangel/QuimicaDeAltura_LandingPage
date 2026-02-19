import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-error-404-page',
  standalone: true,
  imports: [],
  templateUrl: './error-404-page.html',
  styleUrl: './error-404-page.scss',
})
export class Error404Page implements AfterViewInit, OnDestroy {
  // 1. Las constantes de la clase se definen como propiedades
  private readonly POT_BOTTOM_Y = 585;
  private readonly POTS_TIMES = [
    { duration: 0.5 + Math.random() * 0.3, delay: 0 },
    { duration: 0.5 + Math.random() * 0.3, delay: 0.5 },
    { duration: 0.5 + Math.random() * 0.3, delay: 0.2 },
  ];

  private masterTimeline!: gsap.core.Timeline;

  constructor() { }

  // 2. Ejecutamos la animación cuando la vista ya cargó
  ngAfterViewInit() {
    this.initAnimation();
  }

  private initAnimation() {
    this.masterTimeline = gsap.timeline();

    // Pots
    const potsTimeline = [...document.querySelectorAll('.pot')].map((pot, i) => {
      return gsap.timeline().from(pot, {
        duration: this.POTS_TIMES[i].duration,
        delay: this.POTS_TIMES[i].delay,
        y: -this.POT_BOTTOM_Y,
      });
    });

    // Shadows
    const shadowsTimeline = [...document.querySelectorAll('.pot-shadow')].map((shadow, i) => {
      return gsap.timeline().from(shadow, {
        duration: this.POTS_TIMES[i].duration,
        ease: "power1.inOut",
        delay: this.POTS_TIMES[i].delay,
        scale: 0,
        transformOrigin: 'center center',
      });
    });

    // Leafs
    const leafsTimeline = [...document.querySelectorAll('.leaf')].map(leaf => {
      const isBack = leaf.classList.contains('leaf-back');
      return gsap.timeline().from(leaf, {
        duration: 0.5 + Math.random() * 0.8,
        delay: isBack ? 0.5 : 0,
        ease: `back.out(${0.5 + Math.random()})`,
        scale: 0,
        yPercent: 10 * Math.random(),
        transformOrigin: 'center bottom',
      });
    });

    // Flowers
    const flowersTimeline = [...document.querySelectorAll('.flower')].map(flower => {
      const isLeft = flower.classList.contains('flower-left');
      return gsap.timeline().from(flower, {
        duration: 1 + Math.random() * 1,
        ease: "circ.out",
        scale: 0,
        transformOrigin: isLeft ? 'right bottom' : 'left bottom',
      });
    });

    // Master Timeline
    this.masterTimeline
      .to('.replay-text', { duration: 0, opacity: 0 })
      .add(potsTimeline, 0)
      .add(shadowsTimeline, 0)
      .add(leafsTimeline)
      .add(flowersTimeline)
      .to('.replay-text', { duration: 0.5, opacity: 1 });
  }

  // Listener de click (puedes usar (click) en el HTML o esto)
  public restartAnimation() {
    if (this.masterTimeline && !this.masterTimeline.isActive()) {
      this.masterTimeline.restart();
    }
  }

  ngOnDestroy() {
    // Limpieza para evitar fugas de memoria
    if (this.masterTimeline) this.masterTimeline.kill();
  }
}