import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedGasStation } from './trusted-gas-station';

describe('TrustedGasStation', () => {
  let component: TrustedGasStation;
  let fixture: ComponentFixture<TrustedGasStation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedGasStation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedGasStation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
