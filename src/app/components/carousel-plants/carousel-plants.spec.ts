import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPlants } from './carousel-plants';

describe('CarouselPlants', () => {
  let component: CarouselPlants;
  let fixture: ComponentFixture<CarouselPlants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselPlants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselPlants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
