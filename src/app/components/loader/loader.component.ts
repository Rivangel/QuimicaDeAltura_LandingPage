import { Component, input, computed } from '@angular/core';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss',
})
export class LoaderComponent {
    mode = input<'fullscreen' | 'inline'>('fullscreen');
    loading = input<boolean>(true);

    isActive = computed(() => this.loading());
}
