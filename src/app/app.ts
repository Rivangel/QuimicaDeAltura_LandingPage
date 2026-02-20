import { Component, signal } from '@angular/core';
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
import { FallingLeavesBackground } from "./components/falling-leaves-background/falling-leaves-background";
import { FallingLeavesFront } from "./components/falling-leaves-front/falling-leaves-front";
import { HeroSection } from "./components/hero-section/hero-section";
import { RadialMenuSection } from "./components/radial-menu-section/radial-menu-section";
import { ContentService } from "./services/content.service";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, Header, Footer, AboutApp, ProblemMission,
    AppShowcase, ScrollPlant, ScrollVideoBackground,
    Faq, Newsletter, OverallStatistics,
    HowItWorks, Testimonials, CtaBanner,
    FallingLeavesBackground, FallingLeavesFront,
    HeroSection, RadialMenuSection
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('LandingPage');

  // Use content service for state management
  constructor(public contentService: ContentService) {}

  // Expose service signals for template (read-only access)
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
