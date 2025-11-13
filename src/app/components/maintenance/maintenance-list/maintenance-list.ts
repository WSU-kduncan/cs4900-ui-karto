import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MaintenanceDto } from '../../../shared/models/dtos.interface';
import { MaintenanceService } from '../../../service/maintenance-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaintenanceItem } from "../maintenance-detail/maintenance-detail";

@Component({
  selector: 'app-maintenance-list',
  imports: [MaintenanceItem],
  templateUrl: './maintenance-list.html',
  styleUrl: './maintenance-list.scss',
  standalone: true,
})
export class MaintenanceList {
  private readonly maintenanceService = inject(MaintenanceService);
  readonly maintenances = this.maintenanceService.maintenances

  maintenanceId = signal(0);

  onMaintenanceIdChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.maintenanceId.set(parseInt(input.value))
  }

  addMaintenanceId() {
    const dto: MaintenanceDto = {
        carVin: "IDK",
        cost: 23.53,
        date: "Now",
        id: this.maintenanceId(),
        itemDetails: [],
        mileage: 10000,
        receipt: null,
    };
    this.maintenanceService.addMaintenance(dto);
  }
}