import { Component, inject, input, output } from '@angular/core';
import { MaintenanceDto } from '@shared/models/dtos.interface';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Button } from 'primeng/button';
import { MaintenanceService } from '@services/maintenance.service';

@Component({
  selector: 'app-maintenance-item',
  imports: [DatePipe, CurrencyPipe, DecimalPipe, Button],
  standalone: true,
  templateUrl: './maintenance-detail.html',
  styleUrl: './maintenance-detail.scss',
})
export class MaintenanceItem {
  maintenance = input.required<MaintenanceDto>();
  maintenanceService = inject(MaintenanceService);
  onDelete = output();

  deleteMaintenance() {
    this.maintenanceService.deleteMaintenance(this.maintenance().id).subscribe({
      next: () => {
        this.onDelete.emit();
      },
    });
  }
}
