import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GasPriceDetail } from './gas-price-detail';

describe('GasPriceDetail', () => {
  let component: GasPriceDetail;
  let fixture: ComponentFixture<GasPriceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasPriceDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(GasPriceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
