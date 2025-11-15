import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListDetail } from './car-list-detail';

describe('CarListDetail', () => {
  let component: CarListDetail;
  let fixture: ComponentFixture<CarListDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarListDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CarListDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
