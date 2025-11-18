import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MaintenanceDto } from '@shared/models/dtos.interface';
import { MaintenanceService } from '@services/maintenance.service';
import { MaintenanceItem } from '@components/maintenance/maintenance-detail/maintenance-detail';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaintenanceForm } from "../maintenance-form/maintenance-form";

@Component({
  selector: 'app-maintenance-list',
  imports: [MaintenanceItem, MaintenanceForm],
  templateUrl: './maintenance-list.html',
  styleUrl: './maintenance-list.scss',
  standalone: true,
})
export class MaintenanceList {
  private readonly maintenanceService = inject(MaintenanceService);

  public maintenances: Signal<MaintenanceDto[]> = toSignal(
    this.maintenanceService.maintenanceList,
    {
      initialValue: [],
    }
  );
}
