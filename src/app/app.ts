import { Component, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class App implements AfterViewInit {
  @ViewChild('contentWrapper') contentWrapperRef!: ElementRef<HTMLElement>;

  protected readonly title = signal('LandingPage');

  // Card content state
  cardContent = signal({
    title: 'Lo mejor de la\nNaturaleza + IA:\nCuidamos tu salud.',
    description: 'Estudiamos las plantas medicinales de Veracruz con tecnología inteligente para encontrar remedios naturales que realmente funcionen.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop'
  });

  // Alternative content
  private alternativeContent = {
    title: 'Innovación y Tradición:\nUnidas para tu Bienestar.',
    description: 'Combinamos el saber de nuestros abuelos sobre plantas medicinales con tecnología moderna para darte soluciones naturales que sí funcionan.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop'
  };

  // Mission content
  private missionContent = {
    title: 'Nuestra Misión',
    description: 'Queremos que todos puedan acceder a la medicina tradicional mexicana. Usamos tecnología inteligente para cuidar el conocimiento sobre plantas de las Altas Montañas de Veracruz y ofrecer soluciones naturales que todos puedan usar.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop'
  };

  // Vision content
  private visionContent = {
    title: 'Nuestra Visión',
    description: 'Queremos ser la mejor herramienta en América Latina que une el conocimiento antiguo sobre plantas medicinales con la tecnología de hoy, creando un puente entre el pasado y el futuro para el bienestar de nuestras comunidades.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop'
  };

  // Values content
  private valuesContent = {
    title: 'Nuestros Valores',
    description: 'Respetamos el conocimiento tradicional, usamos tecnología que ayuda sin dañar, trabajamos para que todos puedan acceder, cuidamos el medio ambiente y nos comprometemos a proteger la cultura de nuestras comunidades.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  };

  // Contact content
  private contactContent = {
    title: 'Contáctanos',
    description: '¿Tienes preguntas o sugerencias? Estamos aquí para ayudarte. Escríbenos a contacto@quimicadealtura.com o completa nuestro formulario para recibir más información sobre nuestra herramienta y servicios.',
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=800&auto=format&fit=crop'
  };

  // Business model content
  private businessModelContent = {
    title: 'Modelo de Negocio',
    description: 'Nuestra aplicación es completamente gratuita para todos los usuarios. Trabajamos con empresas que venden plantas medicinales y las conectamos contigo. Cuando encuentres una planta que necesites, te redirigimos a vendedores confiables donde puedes adquirirla.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  };

  private isOriginalContent = true;
  activeButton = signal<string | null>('heart');

  ngAfterViewInit() {
    const el = this.contentWrapperRef.nativeElement;
    el.style.height = el.offsetHeight + 'px';
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
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop'
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
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop'
    });
  }
}
