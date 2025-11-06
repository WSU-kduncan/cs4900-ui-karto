import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasPrice } from './gas-price';

describe('GasPrice', () => {
  let component: GasPrice;
  let fixture: ComponentFixture<GasPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasPrice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasPrice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
