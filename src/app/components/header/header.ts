import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  menuOpen = signal(false);
  activeSection = signal('');

  private observer: IntersectionObserver | null = null;
  private sectionIds = [
    'home',
    'about-app',
    'how-it-works',
    'statistics',
    'problem-mission',
    'testimonials',
    'faq',
    'newsletter',
  ];

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
