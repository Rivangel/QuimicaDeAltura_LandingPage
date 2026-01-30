import { Component, HostListener, OnInit, OnDestroy, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scroll-video-background',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-video-background.html',
    styleUrl: './scroll-video-background.scss'
})
export class ScrollVideoBackground implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
    
    scrollPercent = signal(0);
    private isScrolling = false;
    private scrollTimeout: any;

    ngOnInit() {
        // Initialize video when component loads
    }

    ngAfterViewInit() {
        const video = this.videoElement?.nativeElement;
        if (video) {
            // Preload video metadata
            video.load();
            // Prevent video from playing automatically
            video.pause();
        }
    }

    ngOnDestroy() {
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (!this.isScrolling) {
            this.isScrolling = true;
        }

        // Clear existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        // Calculate scroll percentage
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollableHeight = documentHeight - windowHeight;
        
        // Calculate scroll percentage (0 to 100)
        const rawPercent = scrollableHeight > 0 
            ? Math.min(Math.max((scrollTop / scrollableHeight) * 100, 0), 100)
            : 0;
        
        this.scrollPercent.set(rawPercent);
        this.updateVideoFrame(rawPercent);

        // Reset scrolling flag after scroll ends
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 150);
    }

    private updateVideoFrame(scrollPercent: number) {
        const video = this.videoElement?.nativeElement;
        if (!video) return;

        // Get video duration
        const duration = video.duration;
        if (!duration || isNaN(duration)) return;

        // Map scroll percentage (0-100) to video time (0 to duration)
        const targetTime = (scrollPercent / 100) * duration;
        
        // Only update if the difference is significant (prevents excessive updates)
        if (Math.abs(video.currentTime - targetTime) > 0.1) {
            video.currentTime = targetTime;
        }
    }
}

