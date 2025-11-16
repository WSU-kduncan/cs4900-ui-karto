import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasStationDetail } from './gas-station-detail';

describe('GasStationDetail', () => {
  let component: GasStationDetail;
  let fixture: ComponentFixture<GasStationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasStationDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(GasStationDetail);
    component = fixture.componentInstance;

    component.station.set({ id: 1, name: 'Test Station', address: '123 Test St' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
