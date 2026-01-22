import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutApp } from './about-app';

describe('AboutApp', () => {
  let component: AboutApp;
  let fixture: ComponentFixture<AboutApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
