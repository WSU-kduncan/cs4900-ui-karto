import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasPriceForm } from './gas-price-form';

describe('GasPriceForm', () => {
  let component: GasPriceForm;
  let fixture: ComponentFixture<GasPriceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasPriceForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GasPriceForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
