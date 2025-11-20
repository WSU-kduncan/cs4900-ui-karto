import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MaintenanceDto } from '@shared/models/dtos.interface';
import { MaintenanceService } from '@services/maintenance.service';
import { MaintenanceItem } from '@components/maintenance/maintenance-detail/maintenance-detail';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-maintenance-list',
  imports: [MaintenanceItem],
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
    },
  );
  postMaintenancerError = signal('');
  maintenanceId = signal(0);
  date = signal(new Date().toLocaleDateString());
  cost = signal(0);
  mileage = signal(0);

  onMaintenanceIdChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.maintenanceId.set(parseInt(input.value));
  }

  onCostChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cost.set(parseFloat(input.value));
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.date.set(input.value as any);
  }

  onMileageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.mileage.set(parseInt(input.value));
  }

  addMaintenanceId() {
    const dto: MaintenanceDto = {
      carVin: '1HGCM82633A004352',
      cost: this.cost(),
      date: new Date(this.date()).toISOString(),
      id: this.maintenanceId(),
      itemDetails: [],
      mileage: this.mileage(),
      receipt: null,
    };

    this.maintenanceService.postMaintenance(dto).subscribe({
      error: (err: HttpErrorResponse) => {
        this.postMaintenancerError.set(err.error ?? 'Could not create maintenance');
      },
    });
  }
}
