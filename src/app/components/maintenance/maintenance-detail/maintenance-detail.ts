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

  openReceipt() {
    const base64 = this.maintenance().receipt!;
    // Use a Blob because security policies may prevent direct image loading from base64 URLs.
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++)
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl);
  }
}
