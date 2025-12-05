import { Component, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { MaintenanceDto, MaintenanceStatisticsDto } from '@shared/models/dtos.interface';
import { MaintenanceService } from '@services/maintenance.service';
import { MaintenanceItem } from '@components/maintenance/maintenance-detail/maintenance-detail';
import { MaintenanceForm } from '../maintenance-form/maintenance-form';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-maintenance-list',
  imports: [MaintenanceItem, MaintenanceForm, DatePipe, DecimalPipe],
  templateUrl: './maintenance-list.html',
  styleUrl: './maintenance-list.scss',
  standalone: true,
})
export class MaintenanceList implements OnInit, OnDestroy {
  private readonly maintenanceService = inject(MaintenanceService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected vin = signal<string>('');
  protected maintenances = signal<MaintenanceDto[]>([]);
  protected statistics = signal<MaintenanceStatisticsDto | null>(null);
  protected error = signal<string>('');

  getMaintenances() {
    if (!this.vin()) return;
    this.maintenanceService.getMaintenancesByVin(this.vin()).subscribe({
      next: (data) => {
        this.maintenances.set(data);
      },
    });
  }

  getStatistics() {
    if (!this.vin()) return;
    this.maintenanceService.getMaintenanceStatistics(this.vin()).subscribe({
      next: (data) => {
        this.statistics.set(data);
      },
    });
  }

  private maintenanceChangedSubscribe = this.maintenanceService.maintenanceChanged.subscribe(() => {
    this.getMaintenances();
    this.getStatistics();
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const vin = params.get('vin');
      if (!vin) {
        this.error.set('No VIN specified.');
        return;
      }
      this.vin.set(vin);
      this.getMaintenances();
      this.getStatistics();
    });
  }

  ngOnDestroy(): void {
    this.maintenanceChangedSubscribe.unsubscribe();
  }
}
