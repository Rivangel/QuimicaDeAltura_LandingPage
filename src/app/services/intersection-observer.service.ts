import { Injectable, OnDestroy, signal } from '@angular/core';

/**
 * Service for managing IntersectionObserver instances
 * Provides reusable intersection observer logic for components
 */
@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService implements OnDestroy {
  private observers = new Map<string, IntersectionObserver>();

  /**
   * Create or get an intersection observer with the given options
   */
  createObserver(
    id: string,
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    // Reuse existing observer if available
    if (this.observers.has(id)) {
      return this.observers.get(id)!;
    }

    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1,
      ...options,
    };

    const observer = new IntersectionObserver(callback, defaultOptions);
    this.observers.set(id, observer);
    return observer;
  }

  /**
   * Observe an element with the given observer
   */
  observe(observer: IntersectionObserver, element: Element | null): void {
    if (element && observer) {
      observer.observe(element);
    }
  }

  /**
   * Disconnect an observer by ID
   */
  disconnect(id: string): void {
    const observer = this.observers.get(id);
    if (observer) {
      observer.disconnect();
      this.observers.delete(id);
    }
  }

  /**
   * Disconnect all observers
   */
  ngOnDestroy(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}

/**
 * Base class for components using intersection observer
 * Provides common intersection observer functionality
 */
export abstract class WithIntersectionObserver {
  protected visible = signal(false);
  protected observer: IntersectionObserver | null = null;

  /**
   * Setup intersection observer for visibility detection
   */
  protected setupIntersectionObserver(
    elementRef: HTMLElement | null,
    options?: IntersectionObserverInit
  ): void {
    if (!elementRef) return;

    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1,
      ...options,
    };

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.visible.set(true);
          }
        });
      },
      defaultOptions
    );

    this.observer.observe(elementRef);
  }

  /**
   * Cleanup intersection observer
   */
  protected cleanupIntersectionObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
