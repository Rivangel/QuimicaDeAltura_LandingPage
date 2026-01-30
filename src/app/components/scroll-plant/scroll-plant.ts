import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scroll-plant',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-plant.html',
    styleUrl: './scroll-plant.scss'
})
export class ScrollPlant {
    scrollPercent = signal(0);
    growthHeight = signal(0);

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollableHeight = documentHeight - windowHeight;

        // 0 to 100
        const rawPercent = Math.min(Math.max((scrollTop / scrollableHeight) * 100, 0), 100);
        this.scrollPercent.set(rawPercent);

        // Map scroll (0-100) to Plant Growth (0-75%)
        this.growthHeight.set(rawPercent * 0.75);
    }

    getLeaves() {
        const leafCount = 10;
        return Array.from({ length: leafCount }, (_, i) => ({
            id: i,
            side: i % 2 === 0 ? 'left' : 'right',
            threshold: (i + 1) * (100 / leafCount),
            bottomPos: (i + 1) * (75 / leafCount)
        })).filter((leaf, index) => {
            // Remove the second left leaf from bottom (index 2)
            return !(index === 2 && leaf.side === 'left');
        });
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
