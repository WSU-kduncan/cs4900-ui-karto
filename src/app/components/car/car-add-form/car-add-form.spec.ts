import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddForm } from './car-add-form';

describe('CarListForm', () => {
  let component: CarAddForm;
  let fixture: ComponentFixture<CarAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CarAddForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
