import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { CarouselPlants } from "./components/carousel-plants/carousel-plants";
import { AboutApp } from "./components/about-app/about-app";
import { ProblemMission } from "./components/problem-mission/problem-mission";
import { AppShowcase } from "./components/app-showcase/app-showcase";
import { ScrollPlant } from "./components/scroll-plant/scroll-plant";
import { RadialMenu } from "./components/radial-menu/radial-menu";
import { ScrollVideoBackground } from "./components/scroll-video-background/scroll-video-background";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CarouselPlants, AboutApp, ProblemMission, AppShowcase, ScrollPlant, RadialMenu, ScrollVideoBackground],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('LandingPage');
  
  // Card content state
  cardContent = signal({
    title: 'Lo mejor de la\nNaturaleza + IA:\nCuidamos tu salud.',
    description: 'Analizamos las plantas medicinales de Veracruz con inteligencia artificial para encontrar soluciones naturales que de verdad funcionen.'
  });

  // Alternative content
  private alternativeContent = {
    title: 'Innovación y Tradición:\nUnidas para tu Bienestar.',
    description: 'Combinamos el conocimiento ancestral de las plantas medicinales con tecnología de vanguardia para ofrecerte soluciones naturales efectivas y seguras.'
  };

  // Mission content
  private missionContent = {
    title: 'Nuestra Misión',
    description: 'Democratizar el acceso a la medicina tradicional mexicana mediante inteligencia artificial, preservando el conocimiento etnobotánico de las Altas Montañas de Veracruz y ofreciendo soluciones naturales accesibles para todos.'
  };

  // Vision content
  private visionContent = {
    title: 'Nuestra Visión',
    description: 'Ser la plataforma líder en América Latina que conecta la sabiduría ancestral de las plantas medicinales con la tecnología moderna, creando un puente entre el pasado y el futuro para el bienestar de las comunidades.'
  };

  // Values content
  private valuesContent = {
    title: 'Nuestros Valores',
    description: 'Respeto por el conocimiento tradicional, innovación tecnológica responsable, accesibilidad universal, sostenibilidad ambiental y compromiso con la preservación cultural de nuestras comunidades indígenas y rurales.'
  };

  // Contact content
  private contactContent = {
    title: 'Contáctanos',
    description: '¿Tienes preguntas o sugerencias? Estamos aquí para ayudarte. Escríbenos a contacto@quimicadealtura.com o completa nuestro formulario para recibir más información sobre nuestra plataforma y servicios.'
  };

  // Business model content
  private businessModelContent = {
    title: 'Modelo de Negocio',
    description: 'Ofrecemos acceso gratuito a la información básica de plantas medicinales, con suscripciones premium para análisis avanzados con IA, consultorías personalizadas y alianzas estratégicas con instituciones de salud y educación.'
  };

  private isOriginalContent = true;
  activeButton = signal<string | null>('heart');

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
      description: 'Analizamos las plantas medicinales de Veracruz con inteligencia artificial para encontrar soluciones naturales que de verdad funcionen.'
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
      description: 'Analizamos las plantas medicinales de Veracruz con inteligencia artificial para encontrar soluciones naturales que de verdad funcionen.'
    });
  }
}
