import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-plants',
  imports: [],
  templateUrl: './carousel-plants.html',
  styleUrl: './carousel-plants.scss',
})
export class CarouselPlants {
  images: string[] = [
    'resources/images/aloe_1280x853.jpg',
    'resources/images/manzanilla_1280x855.jpg',
    'resources/images/menta_1280x960.jpg'
  ];
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide(); // Restart timer on manual interaction
  }
}
