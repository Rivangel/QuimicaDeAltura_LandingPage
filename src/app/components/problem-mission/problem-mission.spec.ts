import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemMission } from './problem-mission';

describe('ProblemMission', () => {
  let component: ProblemMission;
  let fixture: ComponentFixture<ProblemMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemMission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemMission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
