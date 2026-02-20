import { Injectable, signal } from '@angular/core';
import { CardContent } from '../models/card-content.interface';

/**
 * Content service for managing card content data
 * Centralizes all content definitions and state management
 */
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  // Default content
  private readonly DEFAULT_CONTENT: CardContent = {
    title: 'Lo mejor de la\nNaturaleza + IA:\nCuidamos tu salud.',
    description: 'Estudiamos las plantas medicinales de Veracruz con tecnología inteligente para encontrar remedios naturales que realmente funcionen.',
    image: 'resources/images/lush Veracruz mountain vegetation.png'
  };

  // Alternative content
  private readonly ALTERNATIVE_CONTENT: CardContent = {
    title: 'Innovación y Tradición:\nUnidas para tu Bienestar.',
    description: 'Combinamos el saber de nuestros abuelos sobre plantas medicinales con tecnología moderna para darte soluciones naturales que sí funcionan.',
    image: 'resources/images/elder\'s hands holding a medicinal herb.png'
  };

  // Mission content
  private readonly MISSION_CONTENT: CardContent = {
    title: 'Nuestra Misión',
    description: 'Queremos que todos puedan acceder a la medicina tradicional mexicana. Usamos tecnología inteligente para cuidar el conocimiento sobre plantas de las Altas Montañas de Veracruz y ofrecer soluciones naturales que todos puedan usar.',
    image: 'resources/images/Panoramic shot of the Altas Montañas region.png'
  };

  // Vision content
  private readonly VISION_CONTENT: CardContent = {
    title: 'Nuestra Visión',
    description: 'Queremos ser la mejor herramienta en América Latina que une el conocimiento antiguo sobre plantas medicinales con la tecnología de hoy, creando un puente entre el pasado y el futuro para el bienestar de nuestras comunidades.',
    image: 'resources/images/stylized map of Latin America with botanical nodes.png'
  };

  // Values content
  private readonly VALUES_CONTENT: CardContent = {
    title: 'Nuestros Valores',
    description: 'Respetamos el conocimiento tradicional, usamos tecnología que ayuda sin dañar, trabajamos para que todos puedan acceder, cuidamos el medio ambiente y nos comprometemos a proteger la cultura de nuestras comunidades.',
    image: 'resources/images/A community scene.png'
  };

  // Contact content
  private readonly CONTACT_CONTENT: CardContent = {
    title: 'Contáctanos',
    description: '¿Tienes preguntas o sugerencias? Estamos aquí para ayudarte. Escríbenos a contacto@quimicadealtura.com o completa nuestro formulario para recibir más información sobre nuestra herramienta y servicios.',
    image: 'resources/images/warm workspace .png'
  };

  // Business model content
  private readonly BUSINESS_MODEL_CONTENT: CardContent = {
    title: 'Modelo de Negocio',
    description: 'Nuestra aplicación es completamente gratuita para todos los usuarios. Trabajamos con empresas que venden plantas medicinales y las conectamos contigo. Cuando encuentres una planta que necesites, te redirigimos a vendedores confiables donde puedes adquirirla.',
    image: 'resources/images/A marketplace or vendor scene.png'
  };

  // Content map for easy access
  private readonly CONTENT_MAP: Record<string, CardContent> = {
    default: this.DEFAULT_CONTENT,
    alternative: this.ALTERNATIVE_CONTENT,
    mission: this.MISSION_CONTENT,
    vision: this.VISION_CONTENT,
    values: this.VALUES_CONTENT,
    contact: this.CONTACT_CONTENT,
    business: this.BUSINESS_MODEL_CONTENT,
  };

  // State
  cardContent = signal<CardContent>(this.DEFAULT_CONTENT);
  activeButton = signal<string | null>('heart');

  /**
   * Get content by key
   */
  getContent(key: string): CardContent {
    return this.CONTENT_MAP[key] || this.DEFAULT_CONTENT;
  }

  /**
   * Set content by key
   */
  setContent(key: string, buttonId: string | null = null): void {
    const content = this.getContent(key);
    this.cardContent.set(content);
    if (buttonId !== null) {
      this.activeButton.set(buttonId);
    }
  }

  /**
   * Set default content
   */
  setDefaultContent(): void {
    this.setContent('default', 'heart');
  }

  /**
   * Set alternative content
   */
  setAlternativeContent(): void {
    this.setContent('alternative', 'showcase');
  }

  /**
   * Set mission content
   */
  setMissionContent(): void {
    this.setContent('mission', 'mission');
  }

  /**
   * Set vision content
   */
  setVisionContent(): void {
    this.setContent('vision', 'vision');
  }

  /**
   * Set values content
   */
  setValuesContent(): void {
    this.setContent('values', 'values');
  }

  /**
   * Set contact content
   */
  setContactContent(): void {
    this.setContent('contact', 'contact');
  }

  /**
   * Set business model content
   */
  setBusinessModelContent(): void {
    this.setContent('business', 'business');
  }
}
