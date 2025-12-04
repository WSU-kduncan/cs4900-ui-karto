import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasPriceSelector } from './gas-price-selector.component';

describe('GasPriceSelecter', () => {
  let component: GasPriceSelector;
  let fixture: ComponentFixture<GasPriceSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasPriceSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(GasPriceSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
