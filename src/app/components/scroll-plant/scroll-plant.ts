import { Component, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scroll-plant',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-plant.html',
    styleUrl: './scroll-plant.scss'
})
export class ScrollPlant implements OnInit {
    scrollPercent = signal(0);
    growthHeight = signal(0);
    leaves: any[] = [];

    ngOnInit() {
        this.leaves = this.generateLeaves();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollableHeight = documentHeight - windowHeight;

        const rawPercent = scrollableHeight > 0 
            ? Math.min(Math.max((scrollTop / scrollableHeight) * 100, 0), 100) 
            : 0;
            
        this.scrollPercent.set(rawPercent);
        this.growthHeight.set(rawPercent * 0.75); // Plant grows up to 75% of screen
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
