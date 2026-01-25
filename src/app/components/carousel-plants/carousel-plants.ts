import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-plants',
  imports: [],
  templateUrl: './carousel-plants.html',
  styleUrl: './carousel-plants.scss',
})
export class CarouselPlants {
  images: string[] = [
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1920&auto=format&fit=crop', // Bio-lab research/analysis
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1920&auto=format&fit=crop', // Analysis in lab (Replacement for broken img)
    'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1920&auto=format&fit=crop', // Technology/Green data concept
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1920&auto=format&fit=crop', // Petri dish/Plants (Biological research)
    'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=1920&auto=format&fit=crop' // Person using phone in nature (App diagnosis concept)
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
