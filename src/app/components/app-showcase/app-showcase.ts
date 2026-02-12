import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-showcase',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app-showcase.html',
    styleUrl: './app-showcase.scss'
})
export class AppShowcase implements AfterViewInit, OnDestroy {
    visible = signal(false);
    private observer: IntersectionObserver | null = null;

    constructor(private el: ElementRef) { }

    activeTab = 'home';

    tabs = [
        {
            id: 'home',
            title: 'Tu Biblioteca de Plantas Medicinales',
            description: 'Accede al catálogo más completo de plantas medicinales de Veracruz con información detallada y fácil de usar.',
            icon: '🌿',
            image: '/resources/images/app_mockup_home.png'
        },
        {
            id: 'scan',
            title: 'Identificador Inteligente',
            description: 'Toma una foto a cualquier planta y descubre al instante su nombre y propiedades curativas.',
            icon: '📸',
            image: '/resources/images/app_mockup_scan.png'
        },
        {
            id: 'chat',
            title: 'Asistente Yolotl',
            description: 'Resuelve tus dudas sobre remedios naturales conversando con nuestro experto en IA.',
            icon: '💬',
            image: '/resources/images/app_mockup_chat.png'
        }
    ];

    get activeImage() {
        return this.tabs.find(t => t.id === this.activeTab)?.image || '';
    }

    setTab(tabId: string) {
        this.activeTab = tabId;
    }

    ngAfterViewInit() {
        this.observer = new IntersectionObserver(
            ([entry]) => {
                this.visible.set(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
