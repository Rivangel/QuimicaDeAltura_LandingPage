import { Component, signal, AfterViewInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { AboutApp } from "./components/about-app/about-app";
import { ProblemMission } from "./components/problem-mission/problem-mission";
import { AppShowcase } from "./components/app-showcase/app-showcase";
import { ScrollPlant } from "./components/scroll-plant/scroll-plant";
import { WebglBackground } from "./components/webgl-background/webgl-background";
import { Faq } from "./components/faq/faq";
import { Newsletter } from "./components/newsletter/newsletter";
import { OverallStatistics } from "./components/overall-statistics/overall-statistics";
import { HowItWorks } from "./components/how-it-works/how-it-works";
import { Testimonials } from "./components/testimonials/testimonials";
import { CtaBanner } from "./components/cta-banner/cta-banner";
import { Phone3dComponent } from "./components/phone-3d/phone-3d.component";
import { HeroSection } from "./components/hero-section/hero-section";
import { RadialMenuSection } from "./components/radial-menu-section/radial-menu-section";
import { LoadingFlowerComponent } from "./components/loading-flower/loading-flower.component";
import { ContentService } from "./services/content.service";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, Header, Footer, AboutApp, ProblemMission,
    AppShowcase, Phone3dComponent, ScrollPlant, WebglBackground,
    Faq, Newsletter, OverallStatistics,
    HowItWorks, Testimonials, CtaBanner,
    HeroSection, RadialMenuSection, LoadingFlowerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('LandingPage');
  protected readonly showLoading = signal(true);

  // Scroll snap
  private snapSections: Element[] = [];
  private snapIndex = 0;
  private snapLocked = false;
  private snapTouchStartY = 0;
  private snapWheelHandler: ((e: WheelEvent) => void) | null = null;
  private snapTouchStartHandler: ((e: TouchEvent) => void) | null = null;
  private snapTouchEndHandler: ((e: TouchEvent) => void) | null = null;

  @ViewChild(AppShowcase) private appShowcaseRef?: AppShowcase;

  // Radial menu card cycling
  private radialCardIndex = 0;
  private readonly radialCards: Array<() => void> = [
    () => this.contentService.setDefaultContent(),
    () => this.contentService.setAlternativeContent(),
    () => this.contentService.setMissionContent(),
    () => this.contentService.setVisionContent(),
    () => this.contentService.setValuesContent(),
    () => this.contentService.setContactContent(),
    () => this.contentService.setBusinessModelContent(),
  ];

  // Showcase tab cycling
  private showcaseTabIndex = 0;
  private readonly showcaseTabs: Array<'home' | 'scan' | 'chat'> = ['home', 'scan', 'chat'];

  constructor(public contentService: ContentService, private ngZone: NgZone) {
    const minLoadTime = Date.now() + 3000;
    const checkDone = () => {
      if (Date.now() >= minLoadTime) {
        this.showLoading.set(false);
        return true;
      }
      return false;
    };
    const t = setInterval(() => {
      if (checkDone()) clearInterval(t);
    }, 100);
    setTimeout(() => {
      clearInterval(t);
      if (this.showLoading()) this.showLoading.set(false);
    }, 10000);
  }

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
      'main > app-testimonials, main > app-faq, main > app-newsletter, main > app-cta-banner, ' +
      'app-footer'
    ));

    const radialIdx = this.snapSections.findIndex(
      s => s.tagName.toLowerCase() === 'app-radial-menu-section'
    );

    const showcaseIdx = this.snapSections.findIndex(
      s => s.tagName.toLowerCase() === 'app-showcase'
    );

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
      const scrollTop = window.scrollY + headerH;

      // Containment check: section that contains the current scroll position
      for (let i = 0; i < this.snapSections.length; i++) {
        const el = this.snapSections[i];
        const top = getDocumentTop(el);
        const bottom = top + (el as HTMLElement).offsetHeight;
        if (scrollTop >= top && scrollTop < bottom) return i;
      }

      // Fallback: nearest top
      let best = 0;
      let bestDist = Infinity;
      this.snapSections.forEach((el, i) => {
        const dist = Math.abs(getDocumentTop(el) - scrollTop);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };

    const isTallSection = (el: Element): boolean =>
      (el as HTMLElement).offsetHeight > window.innerHeight;

    const isAtSectionTop = (el: Element): boolean => {
      const sectionTop = getDocumentTop(el) - getHeaderHeight();
      return window.scrollY <= sectionTop + 50;
    };

    const isAtSectionBottom = (el: Element): boolean => {
      const sectionDocBottom = getDocumentTop(el) + (el as HTMLElement).offsetHeight;
      return window.scrollY + window.innerHeight >= sectionDocBottom - 50;
    };

    const BOUNDARY_HINT_MS = 300;

    const showBoundaryHint = (el: Element, dir: 'down' | 'up') => {
      const cls = dir === 'down' ? 'snap-hint-bottom' : 'snap-hint-top';
      el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), BOUNDARY_HINT_MS + 50);
    };

    const goToSection = (index: number) => {
      if (index < 0 || index >= this.snapSections.length || this.snapLocked) return;
      if (index === radialIdx) {
        this.radialCardIndex = 0;
        this.ngZone.run(() => this.radialCards[0]());
      }
      if (index === showcaseIdx) {
        this.showcaseTabIndex = 0;
        this.ngZone.run(() => this.appShowcaseRef?.setTab(this.showcaseTabs[0]));
      }
      this.snapLocked = true;
      this.snapIndex = index;
      const targetY = getDocumentTop(this.snapSections[index]) - getHeaderHeight();
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      setTimeout(() => { this.snapLocked = false; }, 900);
    };

    this.snapWheelHandler = (e: WheelEvent) => {
      if (this.snapLocked) { e.preventDefault(); return; }
      this.snapIndex = findCurrentIndex();

      if (this.snapIndex === radialIdx) {
        e.preventDefault();
        if (e.deltaY > 0) {
          if (this.radialCardIndex < this.radialCards.length - 1) {
            this.radialCardIndex++;
            this.ngZone.run(() => this.radialCards[this.radialCardIndex]());
            this.snapLocked = true;
            setTimeout(() => { this.snapLocked = false; }, 400);
          } else {
            this.radialCardIndex = 0;
            goToSection(this.snapIndex + 1);
          }
        } else {
          if (this.radialCardIndex > 0) {
            this.radialCardIndex--;
            this.ngZone.run(() => this.radialCards[this.radialCardIndex]());
            this.snapLocked = true;
            setTimeout(() => { this.snapLocked = false; }, 400);
          } else {
            goToSection(this.snapIndex - 1);
          }
        }
      } else if (showcaseIdx !== -1 && this.snapIndex === showcaseIdx) {
        e.preventDefault();
        if (e.deltaY > 0) {
          if (this.showcaseTabIndex < this.showcaseTabs.length - 1) {
            this.showcaseTabIndex++;
            this.ngZone.run(() => this.appShowcaseRef?.setTab(this.showcaseTabs[this.showcaseTabIndex]));
            this.snapLocked = true;
            setTimeout(() => { this.snapLocked = false; }, 400);
          } else {
            this.showcaseTabIndex = 0;
            goToSection(this.snapIndex + 1);
          }
        } else {
          if (this.showcaseTabIndex > 0) {
            this.showcaseTabIndex--;
            this.ngZone.run(() => this.appShowcaseRef?.setTab(this.showcaseTabs[this.showcaseTabIndex]));
            this.snapLocked = true;
            setTimeout(() => { this.snapLocked = false; }, 400);
          } else {
            goToSection(this.snapIndex - 1);
          }
        }
      } else {
        const section = this.snapSections[this.snapIndex];
        if (isTallSection(section)) {
          if (e.deltaY > 0 && isAtSectionBottom(section)) {
            e.preventDefault();
            const nextIdx = this.snapIndex + 1;
            this.snapLocked = true;
            showBoundaryHint(section, 'down');
            setTimeout(() => { this.snapLocked = false; goToSection(nextIdx); }, BOUNDARY_HINT_MS);
          } else if (e.deltaY < 0 && isAtSectionTop(section)) {
            e.preventDefault();
            const prevIdx = this.snapIndex - 1;
            this.snapLocked = true;
            showBoundaryHint(section, 'up');
            setTimeout(() => { this.snapLocked = false; goToSection(prevIdx); }, BOUNDARY_HINT_MS);
          }
          // else: native browser scroll — no preventDefault
        } else {
          e.preventDefault();
          goToSection(e.deltaY > 0 ? this.snapIndex + 1 : this.snapIndex - 1);
        }
      }
    };

    this.snapTouchStartHandler = (e: TouchEvent) => {
      this.snapTouchStartY = e.touches[0].clientY;
    };

    this.snapTouchEndHandler = (e: TouchEvent) => {
      const dy = this.snapTouchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 30 || this.snapLocked) return;
      this.snapIndex = findCurrentIndex();

      if (this.snapIndex === radialIdx) {
        if (dy > 0) {
          if (this.radialCardIndex < this.radialCards.length - 1) {
            this.radialCardIndex++;
            this.ngZone.run(() => this.radialCards[this.radialCardIndex]());
            this.snapLocked = true;
            setTimeout(() => { this.snapLocked = false; }, 400);
          } else {
            this.radialCardIndex = 0;
            goToSection(this.snapIndex + 1);
          }
        } else {
          if (this.radialCardIndex > 0) {
            this.radialCardIndex--;
            this.ngZone.run(() => this.radialCards[this.radialCardIndex]());
            this.snapLocked = true;
            setTimeout(() => { this.snapLocked = false; }, 400);
          } else {
            goToSection(this.snapIndex - 1);
          }
        }
      } else if (showcaseIdx !== -1 && this.snapIndex === showcaseIdx) {
        if (dy > 0) {
          if (this.showcaseTabIndex < this.showcaseTabs.length - 1) {
            this.showcaseTabIndex++;
            this.ngZone.run(() => this.appShowcaseRef?.setTab(this.showcaseTabs[this.showcaseTabIndex]));
            this.snapLocked = true;
            setTimeout(() => { this.snapLocked = false; }, 400);
          } else {
            this.showcaseTabIndex = 0;
            goToSection(this.snapIndex + 1);
          }
        } else {
          if (this.showcaseTabIndex > 0) {
            this.showcaseTabIndex--;
            this.ngZone.run(() => this.appShowcaseRef?.setTab(this.showcaseTabs[this.showcaseTabIndex]));
            this.snapLocked = true;
            setTimeout(() => { this.snapLocked = false; }, 400);
          } else {
            goToSection(this.snapIndex - 1);
          }
        }
      } else {
        const section = this.snapSections[this.snapIndex];
        if (isTallSection(section)) {
          if (dy > 0 && isAtSectionBottom(section)) {
            const nextIdx = this.snapIndex + 1;
            this.snapLocked = true;
            showBoundaryHint(section, 'down');
            setTimeout(() => { this.snapLocked = false; goToSection(nextIdx); }, BOUNDARY_HINT_MS);
          } else if (dy < 0 && isAtSectionTop(section)) {
            const prevIdx = this.snapIndex - 1;
            this.snapLocked = true;
            showBoundaryHint(section, 'up');
            setTimeout(() => { this.snapLocked = false; goToSection(prevIdx); }, BOUNDARY_HINT_MS);
          }
          // else: natural touch scroll already handled it; do nothing
        } else {
          goToSection(dy > 0 ? this.snapIndex + 1 : this.snapIndex - 1);
        }
      }
    };

    window.addEventListener('wheel', this.snapWheelHandler, { passive: false });
    window.addEventListener('touchstart', this.snapTouchStartHandler, { passive: true });
    window.addEventListener('touchend', this.snapTouchEndHandler, { passive: true });
  }

  onContentChange(): void { this.contentService.setAlternativeContent(); this.radialCardIndex = 1; }
  onSetOriginalContent(): void { this.contentService.setDefaultContent(); this.radialCardIndex = 0; }
  onSetMission(): void { this.contentService.setMissionContent(); this.radialCardIndex = 2; }
  onSetVision(): void { this.contentService.setVisionContent(); this.radialCardIndex = 3; }
  onSetValues(): void { this.contentService.setValuesContent(); this.radialCardIndex = 4; }
  onSetContact(): void { this.contentService.setContactContent(); this.radialCardIndex = 5; }
  onSetBusinessModel(): void { this.contentService.setBusinessModelContent(); this.radialCardIndex = 6; }
}
