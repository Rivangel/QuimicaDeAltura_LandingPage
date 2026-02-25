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

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initScrollSnap());
  }

  ngOnDestroy() {
    if (this.snapWheelHandler) window.removeEventListener('wheel', this.snapWheelHandler);
    if (this.snapTouchStartHandler) window.removeEventListener('touchstart', this.snapTouchStartHandler);
    if (this.snapTouchEndHandler) window.removeEventListener('touchend', this.snapTouchEndHandler);
  }

  private initScrollSnap() {
    this.snapSections = Array.from(document.querySelectorAll(
      'main > app-hero-section, main > app-radial-menu-section, ' +
      'main > app-how-it-works, main > app-about-app, main > section, ' +
      'main > app-showcase, main > app-overall-statistics, main > app-problem-mission, ' +
      'main > app-testimonials, main > app-faq, main > app-newsletter, main > app-cta-banner'
    ));

    const getHeaderHeight = (): number => {
      const header = document.querySelector<HTMLElement>('app-header');
      return header ? header.offsetHeight : 0;
    };

    const getDocumentTop = (el: Element): number => {
      let top = 0;
      let node: HTMLElement | null = el as HTMLElement;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const findCurrentIndex = (): number => {
      const headerH = getHeaderHeight();
      const currentPos = window.scrollY + headerH;
      let best = 0;
      let bestDist = Infinity;
      this.snapSections.forEach((el, i) => {
        const dist = Math.abs(getDocumentTop(el) - currentPos);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };

    const goToSection = (index: number) => {
      if (index < 0 || index >= this.snapSections.length || this.snapLocked) return;
      this.snapLocked = true;
      this.snapIndex = index;
      const targetY = getDocumentTop(this.snapSections[index]) - getHeaderHeight();
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      setTimeout(() => { this.snapLocked = false; }, 900);
    };

    this.snapWheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      if (this.snapLocked) return;
      this.snapIndex = findCurrentIndex();
      goToSection(e.deltaY > 0 ? this.snapIndex + 1 : this.snapIndex - 1);
    };

    this.snapTouchStartHandler = (e: TouchEvent) => {
      this.snapTouchStartY = e.touches[0].clientY;
    };

    this.snapTouchEndHandler = (e: TouchEvent) => {
      const dy = this.snapTouchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 30 || this.snapLocked) return;
      this.snapIndex = findCurrentIndex();
      goToSection(dy > 0 ? this.snapIndex + 1 : this.snapIndex - 1);
    };

    window.addEventListener('wheel', this.snapWheelHandler, { passive: false });
    window.addEventListener('touchstart', this.snapTouchStartHandler, { passive: true });
    window.addEventListener('touchend', this.snapTouchEndHandler, { passive: true });
  }

  onContentChange(): void { this.contentService.setAlternativeContent(); }
  onSetOriginalContent(): void { this.contentService.setDefaultContent(); }
  onSetMission(): void { this.contentService.setMissionContent(); }
  onSetVision(): void { this.contentService.setVisionContent(); }
  onSetValues(): void { this.contentService.setValuesContent(); }
  onSetContact(): void { this.contentService.setContactContent(); }
  onSetBusinessModel(): void { this.contentService.setBusinessModelContent(); }
}
