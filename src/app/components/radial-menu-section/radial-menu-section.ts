import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, NgZone, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadialMenu } from '../radial-menu/radial-menu';
import { CardContent } from '../../models/card-content.interface';
import { SCROLL_REVEAL_CONFIG } from '../../config/scroll-reveal.config';

@Component({
  selector: 'app-radial-menu-section',
  standalone: true,
  imports: [CommonModule, RadialMenu],
  templateUrl: './radial-menu-section.html',
  styleUrl: './radial-menu-section.scss'
})
export class RadialMenuSection implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrapper') contentWrapperRef!: ElementRef<HTMLElement>;
  @ViewChild('radialMenuSection') radialMenuSectionRef!: ElementRef<HTMLElement>;

  @Input({ required: true }) cardContent!: Signal<CardContent>;
  @Input({ required: true }) activeButton!: Signal<string | null>;

  @Output() contentChange = new EventEmitter<void>();
  @Output() setOriginalContent = new EventEmitter<void>();
  @Output() setMission = new EventEmitter<void>();
  @Output() setVision = new EventEmitter<void>();
  @Output() setValues = new EventEmitter<void>();
  @Output() setContact = new EventEmitter<void>();
  @Output() setBusinessModel = new EventEmitter<void>();

  private scrollRevealHandler: (() => void) | null = null;

  constructor(private ngZone: NgZone) { }

  get titleLines() {
    return this.cardContent().title.split('\n');
  }

  ngAfterViewInit() {
    const el = this.contentWrapperRef.nativeElement;
    el.style.height = el.offsetHeight + 'px';

    // Setup scroll-based reveal for radial menu section
    this.setupScrollReveal();
  }

  ngOnDestroy() {
    if (this.scrollRevealHandler) {
      window.removeEventListener('scroll', this.scrollRevealHandler);
      window.removeEventListener('resize', this.scrollRevealHandler);
    }
  }

  // Easing function matching DNA helix (easeInOut)
  private easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  private setupScrollReveal() {
    const heroSection = document.getElementById('hero');
    const radialSection = this.radialMenuSectionRef?.nativeElement;

    if (!heroSection || !radialSection) return;

    const updateTransform = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      // Calculate progress based on hero section scroll
      // Progress goes from 0 (at top) to 1 (when hero is scrolled past)
      const heroProgress = Math.max(0, Math.min(1, scrollY / (heroHeight * SCROLL_REVEAL_CONFIG.HERO_PROGRESS_MULTIPLIER)));

      // Use same easing as DNA helix (easeInOut)
      const easedProgress = this.easeInOut(heroProgress);

      // Start small and grow to normal size
      const scale = SCROLL_REVEAL_CONFIG.SCALE_START + (easedProgress * (SCROLL_REVEAL_CONFIG.SCALE_END - SCROLL_REVEAL_CONFIG.SCALE_START));

      // Opacity: fade in as it appears (start completely transparent)
      const opacity = SCROLL_REVEAL_CONFIG.OPACITY_START + (easedProgress * SCROLL_REVEAL_CONFIG.OPACITY_END);

      // Start from top (negative translateY) and move down to final position
      const startFromTop = -heroHeight * SCROLL_REVEAL_CONFIG.TRANSLATE_Y_MULTIPLIER;
      const translateY = startFromTop + (easedProgress * Math.abs(startFromTop));
      const translateX = (1 - easedProgress) * SCROLL_REVEAL_CONFIG.TRANSLATE_X_START;

      // Z-index: start behind hero, move forward to cover it
      const zIndex = SCROLL_REVEAL_CONFIG.Z_INDEX_START + (easedProgress * (SCROLL_REVEAL_CONFIG.Z_INDEX_END - SCROLL_REVEAL_CONFIG.Z_INDEX_START));

      radialSection.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
      radialSection.style.opacity = String(opacity);
      radialSection.style.zIndex = String(Math.floor(zIndex));
      radialSection.style.transformOrigin = 'center center';
    };

    this.scrollRevealHandler = updateTransform;

    // Initial setup
    updateTransform();

    // Update on scroll (outside Angular zone for performance)
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', updateTransform, { passive: true });
      window.addEventListener('resize', updateTransform, { passive: true });
    });
  }

  onContentChange() {
    this.contentChange.emit();
  }

  onSetOriginalContent() {
    this.setOriginalContent.emit();
  }

  onSetMission() {
    this.setMission.emit();
  }

  onSetVision() {
    this.setVision.emit();
  }

  onSetValues() {
    this.setValues.emit();
  }

  onSetContact() {
    this.setContact.emit();
  }

  onSetBusinessModel() {
    this.setBusinessModel.emit();
  }
}
