import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceItem } from './maintenance-detail';

describe('MaintenanceItem', () => {
  let component: MaintenanceItem;
  let fixture: ComponentFixture<MaintenanceItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
