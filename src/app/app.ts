import { Component, signal, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { AboutApp } from "./components/about-app/about-app";
import { ProblemMission } from "./components/problem-mission/problem-mission";
import { AppShowcase } from "./components/app-showcase/app-showcase";
import { ScrollPlant } from "./components/scroll-plant/scroll-plant";
import { ScrollVideoBackground } from "./components/scroll-video-background/scroll-video-background";
import { Faq } from "./components/faq/faq";
import { Newsletter } from "./components/newsletter/newsletter";
import { OverallStatistics } from "./components/overall-statistics/overall-statistics";
import { HowItWorks } from "./components/how-it-works/how-it-works";
import { Testimonials } from "./components/testimonials/testimonials";
import { CtaBanner } from "./components/cta-banner/cta-banner";
import { Phone3dComponent } from "./components/phone-3d/phone-3d.component";
import { HeroSection } from "./components/hero-section/hero-section";
import { RadialMenuSection } from "./components/radial-menu-section/radial-menu-section";
import { ContentService } from "./services/content.service";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, Header, Footer, AboutApp, ProblemMission,
    AppShowcase, Phone3dComponent, ScrollPlant, ScrollVideoBackground,
    Faq, Newsletter, OverallStatistics,
    HowItWorks, Testimonials, CtaBanner,
    HeroSection, RadialMenuSection
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('LandingPage');

  // Scroll snap
  private snapSections: Element[] = [];
  private snapIndex = 0;
  private snapLocked = false;
  private snapTouchStartY = 0;
  private snapWheelHandler: ((e: WheelEvent) => void) | null = null;
  private snapTouchStartHandler: ((e: TouchEvent) => void) | null = null;
  private snapTouchEndHandler: ((e: TouchEvent) => void) | null = null;

  constructor(public contentService: ContentService, private ngZone: NgZone) {}

  get cardContent() {
    return this.contentService.cardContent.asReadonly();
  }

  get activeButton() {
    return this.contentService.activeButton.asReadonly();
  }

  // Delegate methods to content service
  onContentChange(): void {
    this.contentService.setAlternativeContent();
  }

  onSetOriginalContent(): void {
    this.contentService.setDefaultContent();
  }

  onSetMission(): void {
    this.contentService.setMissionContent();
  }

  onSetVision(): void {
    this.contentService.setVisionContent();
  }

  onSetValues(): void {
    this.contentService.setValuesContent();
  }

  onSetContact(): void {
    this.contentService.setContactContent();
  }

  onSetBusinessModel(): void {
    this.contentService.setBusinessModelContent();
  }
}
