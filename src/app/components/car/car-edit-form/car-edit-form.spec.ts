import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEditForm } from './car-edit-form';

describe('CarEditForm', () => {
  let component: CarEditForm;
  let fixture: ComponentFixture<CarEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
