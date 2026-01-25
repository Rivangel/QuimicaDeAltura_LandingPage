import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-showcase',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app-showcase.html',
    styleUrl: './app-showcase.scss'
})
export class AppShowcase {
    activeTab = 'home';

    tabs = [
        {
            id: 'home',
            title: 'Tu Biblioteca Natural',
            description: 'Explora el catálogo más completo de plantas medicinales de la región con un diseño fácil de usar.',
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
}
