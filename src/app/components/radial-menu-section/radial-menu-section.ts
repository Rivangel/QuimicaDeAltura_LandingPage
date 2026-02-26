import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, NgZone, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadialMenu } from '../radial-menu/radial-menu';
import { CardContent } from '../../models/card-content.interface';
import { SCROLL_REVEAL_CONFIG } from '../../config/scroll-reveal.config';

// Card sequence for scroll-based cycling
const CARD_SEQUENCE = [
  { key: 'default', method: 'setDefaultContent', button: 'heart' },
  { key: 'alternative', method: 'setAlternativeContent', button: 'showcase' },
  { key: 'mission', method: 'setMissionContent', button: 'mission' },
  { key: 'vision', method: 'setVisionContent', button: 'vision' },
  { key: 'values', method: 'setValuesContent', button: 'values' },
  { key: 'contact', method: 'setContactContent', button: 'contact' },
  { key: 'business', method: 'setBusinessModelContent', button: 'business' },
];

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
  private cardScrollHandler: (() => void) | null = null;
  private currentCardIndex = 0;
  private readonly CARDS_COUNT = CARD_SEQUENCE.length;

  constructor(private ngZone: NgZone) { }

  get titleLines() {
    return this.cardContent().title.split('\n');
  }

  ngAfterViewInit() {
    const el = this.contentWrapperRef.nativeElement;
    el.style.height = el.offsetHeight + 'px';

    // Setup scroll-based reveal for radial menu section
    this.setupScrollReveal();
    
    // Setup scroll-based card cycling
    this.setupCardCycling();
    
    // Ensure section is visible after a delay (fallback)
    setTimeout(() => {
      const radialSection = this.radialMenuSectionRef?.nativeElement;
      if (radialSection) {
        const currentOpacity = parseFloat(getComputedStyle(radialSection).opacity);
        // If still hidden after 2 seconds, make it visible
        if (currentOpacity < 0.1) {
          radialSection.style.opacity = '1';
          radialSection.style.transform = 'scale(1) translate(0, 0)';
          radialSection.style.zIndex = '0';
        }
      }
    }, 2000);
  }

  ngOnDestroy() {
    if (this.scrollRevealHandler) {
      window.removeEventListener('scroll', this.scrollRevealHandler);
      window.removeEventListener('resize', this.scrollRevealHandler);
    }
    if (this.cardScrollHandler) {
      window.removeEventListener('scroll', this.cardScrollHandler);
      window.removeEventListener('resize', this.cardScrollHandler);
    }
  }

  // Easing function matching DNA helix (easeInOut)
  private easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  private setupScrollReveal() {
    const heroSection = document.getElementById('hero');
    const radialSection = this.radialMenuSectionRef?.nativeElement;

    if (!radialSection) return;

    // If hero section doesn't exist, show the section immediately
    if (!heroSection) {
      radialSection.style.transform = 'scale(1) translate(0, 0)';
      radialSection.style.opacity = '1';
      radialSection.style.zIndex = '0';
      radialSection.style.position = 'relative';
      return;
    }

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
      radialSection.style.position = 'relative'; // Ensure it's positioned correctly
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

  /**
   * Setup scroll-based card cycling within the section
   * Cards change as user scrolls through the section
   */
  private setupCardCycling() {
    const radialSection = this.radialMenuSectionRef?.nativeElement;
    if (!radialSection) return;

    // Make section tall enough to accommodate all cards
    const totalHeightNeeded = window.innerHeight * this.CARDS_COUNT;
    radialSection.style.minHeight = `${totalHeightNeeded}px`;

    const updateCardBasedOnScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionRect = radialSection.getBoundingClientRect();
      
      // Calculate when section enters viewport (after scroll reveal is complete)
      const heroSection = document.getElementById('hero');
      const heroHeight = heroSection?.offsetHeight || 0;
      const revealCompleteScroll = heroHeight * SCROLL_REVEAL_CONFIG.HERO_PROGRESS_MULTIPLIER;
      
      // Section top position in document
      const sectionTop = scrollY + sectionRect.top;
      
      // Only cycle cards when section is visible and reveal animation is done
      if (scrollY >= revealCompleteScroll && sectionRect.top < windowHeight && sectionRect.bottom > 0) {
        // Calculate scroll progress within the section
        // Start counting from when section top enters viewport
        const sectionScrollStart = Math.max(revealCompleteScroll, sectionTop - windowHeight);
        const scrollWithinSection = Math.max(0, scrollY - sectionScrollStart);
        
        // Calculate which card should be shown based on scroll
        // Each card gets a viewport height worth of scroll
        const scrollProgress = Math.min(1, scrollWithinSection / (windowHeight * (this.CARDS_COUNT - 1)));
        
        // Determine card index based on scroll progress
        // Use Math.floor to ensure we show each card for its full scroll range
        const targetCardIndex = Math.min(
          this.CARDS_COUNT - 1,
          Math.floor(scrollProgress * this.CARDS_COUNT)
        );
        
        // Only update if card index changed
        if (targetCardIndex !== this.currentCardIndex) {
          this.currentCardIndex = targetCardIndex;
          this.changeToCard(targetCardIndex);
        }
      }
    };

    this.cardScrollHandler = updateCardBasedOnScroll;

    // Initial calculation
    updateCardBasedOnScroll();

    // Update on scroll (outside Angular zone for performance)
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', updateCardBasedOnScroll, { passive: true });
      window.addEventListener('resize', updateCardBasedOnScroll, { passive: true });
    });
  }

  /**
   * Change to a specific card by index
   */
  private changeToCard(index: number) {
    if (index < 0 || index >= CARD_SEQUENCE.length) return;

    const card = CARD_SEQUENCE[index];
    
    // Emit the appropriate event to change content
    switch (card.method) {
      case 'setDefaultContent':
        this.setOriginalContent.emit();
        break;
      case 'setAlternativeContent':
        this.contentChange.emit();
        break;
      case 'setMissionContent':
        this.setMission.emit();
        break;
      case 'setVisionContent':
        this.setVision.emit();
        break;
      case 'setValuesContent':
        this.setValues.emit();
        break;
      case 'setContactContent':
        this.setContact.emit();
        break;
      case 'setBusinessModelContent':
        this.setBusinessModel.emit();
        break;
    }
  }
}
