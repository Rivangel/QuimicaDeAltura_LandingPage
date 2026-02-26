import { Component, HostListener, signal, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scroll-plant',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-plant.html',
    styleUrl: './scroll-plant.scss'
})
export class ScrollPlant implements OnInit, OnDestroy {
    scrollPercent = signal(0);
    growthHeight = signal(0);
    leaves: any[] = [];
    private isVisible = false;
    private visibilityObserver?: IntersectionObserver;

    constructor(private hostRef: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.leaves = this.generateLeaves();

        this.visibilityObserver = new IntersectionObserver(
            ([entry]) => { this.isVisible = entry.isIntersecting; },
            { rootMargin: '100px' }
        );
        this.visibilityObserver.observe(this.hostRef.nativeElement);
    }

    ngOnDestroy() {
        this.visibilityObserver?.disconnect();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (!this.isVisible) return;

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollableHeight = documentHeight - windowHeight;

        const rawPercent = scrollableHeight > 0
            ? Math.min(Math.max((scrollTop / scrollableHeight) * 100, 0), 100)
            : 0;

        this.scrollPercent.set(rawPercent);
        this.growthHeight.set(rawPercent * 0.75);
    }

    generateLeaves() {
        const leafCount = 12; // increased density
        return Array.from({ length: leafCount }, (_, i) => ({
            id: i,
            side: i % 2 === 0 ? 'left' : 'right',
            threshold: (i + 1) * (100 / leafCount),
            bottomPos: (i + 1) * (75 / leafCount),
            delay: Math.random() * 2 // random animation delay for swaying
        })).filter((leaf, index) => {
            return !(index === 2 && leaf.side === 'left'); // keeping the gap for a more natural look
        });
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
