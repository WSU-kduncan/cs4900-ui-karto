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
export class MaintenanceList implements OnInit {
  private readonly maintenanceService = inject(MaintenanceService);
  private readonly destroyRef = inject(DestroyRef);

  maintenances = signal<MaintenanceDto[]>([]);
  private isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadMaintenances();
    console.log(this.maintenances);
  }

  private loadMaintenances(): void {
    this.isLoading.set(true);

    this.maintenanceService
      .getMaintenance()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.maintenances.set(response);
        },
        error: (error) => {
          console.error('Failed to load work orders:', error);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
