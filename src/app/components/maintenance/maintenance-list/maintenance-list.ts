import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MaintenanceDto } from '@shared/models/dtos.interface';
import { MaintenanceService } from '@services/maintenance.service';
import { MaintenanceItem } from '@components/maintenance/maintenance-detail/maintenance-detail';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaintenanceForm } from '../maintenance-form/maintenance-form';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-list',
  imports: [MaintenanceItem, MaintenanceForm],
  templateUrl: './maintenance-list.html',
  styleUrl: './maintenance-list.scss',
  standalone: true,
})
export class MaintenanceList implements OnInit {
  private readonly maintenanceService = inject(MaintenanceService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected vin = signal<string>('');
  protected maintenances = signal<MaintenanceDto[]>([]);
  protected error = signal<string>('');

  getMaintenances() {
    if (!this.vin()) return;
    this.maintenanceService.getMaintenancesByVin(this.vin()).subscribe({
      next: (data) => {
        this.maintenances.set(data);
      },
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const vin = params.get('vin');
      if (!vin) {
        this.error.set('No VIN specified.');
        return;
      }
      this.vin.set(vin);
      this.getMaintenances();
    });
  }
}
