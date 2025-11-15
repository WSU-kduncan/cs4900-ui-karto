import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasPriceList } from './gas-price-list';

describe('GasPriceList', () => {
  let component: GasPriceList;
  let fixture: ComponentFixture<GasPriceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasPriceList],
    }).compileComponents();

    fixture = TestBed.createComponent(GasPriceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
