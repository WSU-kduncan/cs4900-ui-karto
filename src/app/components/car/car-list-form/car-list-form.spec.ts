import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListForm } from './car-list-form';

describe('CarListForm', () => {
  let component: CarListForm;
  let fixture: ComponentFixture<CarListForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarListForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CarListForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
