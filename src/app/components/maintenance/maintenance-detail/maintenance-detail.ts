import { Component, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core';
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
export class MaintenanceItem implements OnDestroy, OnInit {
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

  imageUrl = signal<string | null>(null);

  ngOnInit(): void {
    if (this.maintenance().receipt) this.setImage(this.maintenance().receipt!);
  }

  openReceipt() {
    window.open(this.imageUrl()!, '_blank');
  }

  setImage(bytes: Uint8Array, type = 'image/png') {
    if (this.imageUrl()) URL.revokeObjectURL(this.imageUrl()!);
    const blob = new Blob([bytes.slice()], { type });
    this.imageUrl.set(URL.createObjectURL(blob));
  }

  ngOnDestroy() {
    if (this.imageUrl()) URL.revokeObjectURL(this.imageUrl()!);
  }
}
