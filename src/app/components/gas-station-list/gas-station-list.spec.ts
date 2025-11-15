import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasStationList } from './gas-station-list';

describe('GasStationList', () => {
  let component: GasStationList;
  let fixture: ComponentFixture<GasStationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasStationList],
    }).compileComponents();

    fixture = TestBed.createComponent(GasStationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
