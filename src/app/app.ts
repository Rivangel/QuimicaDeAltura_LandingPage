import { Component, signal, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { AboutApp } from "./components/about-app/about-app";
import { ProblemMission } from "./components/problem-mission/problem-mission";
import { AppShowcase } from "./components/app-showcase/app-showcase";
import { ScrollPlant } from "./components/scroll-plant/scroll-plant";
import { RadialMenu } from "./components/radial-menu/radial-menu";
import { ScrollVideoBackground } from "./components/scroll-video-background/scroll-video-background";
import { Faq } from "./components/faq/faq";
import { Newsletter } from "./components/newsletter/newsletter";
import { OverallStatistics } from "./components/overall-statistics/overall-statistics";
import { HowItWorks } from "./components/how-it-works/how-it-works";
import { Testimonials } from "./components/testimonials/testimonials";
import { CtaBanner } from "./components/cta-banner/cta-banner";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, Header, Footer, AboutApp, ProblemMission,
    AppShowcase, ScrollPlant, RadialMenu, ScrollVideoBackground,
    Faq, Newsletter, OverallStatistics,
    HowItWorks, Testimonials, CtaBanner
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrapper') contentWrapperRef!: ElementRef<HTMLElement>;

  protected readonly title = signal('LandingPage');

  // Card content state
  cardContent = signal({
    title: 'Lo mejor de la\nNaturaleza + IA:\nCuidamos tu salud.',
    description: 'Estudiamos las plantas medicinales de Veracruz con tecnología inteligente para encontrar remedios naturales que realmente funcionen.',
    image: 'resources/images/lush Veracruz mountain vegetation.png'
  });

  // Alternative content
  private alternativeContent = {
    title: 'Innovación y Tradición:\nUnidas para tu Bienestar.',
    description: 'Combinamos el saber de nuestros abuelos sobre plantas medicinales con tecnología moderna para darte soluciones naturales que sí funcionan.',
    image: 'resources/images/elder\'s hands holding a medicinal herb.png'
  };

  // Mission content
  private missionContent = {
    title: 'Nuestra Misión',
    description: 'Queremos que todos puedan acceder a la medicina tradicional mexicana. Usamos tecnología inteligente para cuidar el conocimiento sobre plantas de las Altas Montañas de Veracruz y ofrecer soluciones naturales que todos puedan usar.',
    image: 'resources/images/Panoramic shot of the Altas Montañas region.png'
  };

  // Vision content
  private visionContent = {
    title: 'Nuestra Visión',
    description: 'Queremos ser la mejor herramienta en América Latina que une el conocimiento antiguo sobre plantas medicinales con la tecnología de hoy, creando un puente entre el pasado y el futuro para el bienestar de nuestras comunidades.',
    image: 'resources/images/stylized map of Latin America with botanical nodes.png'
  };

  // Values content
  private valuesContent = {
    title: 'Nuestros Valores',
    description: 'Respetamos el conocimiento tradicional, usamos tecnología que ayuda sin dañar, trabajamos para que todos puedan acceder, cuidamos el medio ambiente y nos comprometemos a proteger la cultura de nuestras comunidades.',
    image: 'resources/images/A community scene.png'
  };

  // Contact content
  private contactContent = {
    title: 'Contáctanos',
    description: '¿Tienes preguntas o sugerencias? Estamos aquí para ayudarte. Escríbenos a contacto@quimicadealtura.com o completa nuestro formulario para recibir más información sobre nuestra herramienta y servicios.',
    image: 'resources/images/warm workspace .png'
  };

  // Business model content
  private businessModelContent = {
    title: 'Modelo de Negocio',
    description: 'Nuestra aplicación es completamente gratuita para todos los usuarios. Trabajamos con empresas que venden plantas medicinales y las conectamos contigo. Cuando encuentres una planta que necesites, te redirigimos a vendedores confiables donde puedes adquirirla.',
    image: 'resources/images/A marketplace or vendor scene.png'
  };

  private isOriginalContent = true;
  activeButton = signal<string | null>('heart');

  // Preload list removed


  // Falling leaves mouse push
  private mouseX = -9999;
  private mouseY = -9999;
  private leafPushRAF: number | null = null;
  private readonly PUSH_RADIUS = 120;  // how close before push starts (px)
  private readonly PUSH_STRENGTH = 80; // max push distance (px)

  constructor(private ngZone: NgZone) { }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  ngAfterViewInit() {
    const el = this.contentWrapperRef.nativeElement;
    el.style.height = el.offsetHeight + 'px';

    // Preload images removed for performance optimization
    // Images will load on demand when user navigates


    // Start leaf push loop outside Angular zone (no change detection needed)
    this.ngZone.runOutsideAngular(() => this.pushLeavesLoop());
  }

  ngOnDestroy() {
    if (this.leafPushRAF !== null) {
      cancelAnimationFrame(this.leafPushRAF);
    }
  }

  private pushLeavesLoop() {
    const leaves = document.querySelectorAll<HTMLElement>('.falling-leaf');

    const tick = () => {
      leaves.forEach(leaf => {
        const rect = leaf.getBoundingClientRect();
        const leafCX = rect.left + rect.width / 2;
        const leafCY = rect.top + rect.height / 2;
        const dx = leafCX - this.mouseX;
        const dy = leafCY - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.PUSH_RADIUS && dist > 0) {
          // Closer = stronger push, direction away from mouse
          const force = (1 - dist / this.PUSH_RADIUS) * this.PUSH_STRENGTH;
          const pushX = (dx / dist) * force;
          const pushY = (dy / dist) * force;
          leaf.style.setProperty('--push-x', pushX + 'px');
          leaf.style.setProperty('--push-y', pushY + 'px');
        } else {
          leaf.style.setProperty('--push-x', '0px');
          leaf.style.setProperty('--push-y', '0px');
        }
      });

      this.leafPushRAF = requestAnimationFrame(tick);
    };

    this.leafPushRAF = requestAnimationFrame(tick);
  }

  get titleLines() {
    return this.cardContent().title.split('\n');
  }

  onContentChange() {
    this.cardContent.set(this.alternativeContent);
    this.isOriginalContent = false;
    this.activeButton.set('showcase');
  }

  onSetOriginalContent() {
    this.cardContent.set({
      title: 'Lo mejor de la\nNaturaleza + IA:\nCuidamos tu salud.',
      description: 'Estudiamos las plantas medicinales de Veracruz con tecnología inteligente para encontrar remedios naturales que realmente funcionen.',
      image: 'resources/images/lush Veracruz mountain vegetation.png'
    });
    this.isOriginalContent = true;
    this.activeButton.set('heart');
  }

  onSetMission() {
    this.cardContent.set(this.missionContent);
    this.activeButton.set('mission');
  }

  onSetVision() {
    this.cardContent.set(this.visionContent);
    this.activeButton.set('vision');
  }

  onSetValues() {
    this.cardContent.set(this.valuesContent);
    this.activeButton.set('values');
  }

  onSetContact() {
    this.cardContent.set(this.contactContent);
    this.activeButton.set('contact');
  }

  onSetBusinessModel() {
    this.cardContent.set(this.businessModelContent);
    this.activeButton.set('business');
  }

  private setOriginalContent() {
    this.cardContent.set({
      title: 'Lo mejor de la\nNaturaleza + IA:\nCuidamos tu salud.',
      description: 'Estudiamos las plantas medicinales de Veracruz con tecnología inteligente para encontrar remedios naturales que realmente funcionen.',
      image: 'resources/images/lush Veracruz mountain vegetation.png'
    });
  }
}
