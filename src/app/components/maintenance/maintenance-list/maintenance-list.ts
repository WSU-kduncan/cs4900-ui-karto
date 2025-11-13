import { Component, inject, OnInit, signal } from '@angular/core';
import { MaintenanceDto } from '../../../shared/models/dtos.interface';
import { MaintenanceService } from '../../../service/maintenance-service';
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

  isLoading = signal(true);
  public maintenances = signal<MaintenanceDto[]>([])
  ngOnInit(): void {
    this.maintenanceService.getMaintenance().subscribe({
        next: res => {
            this.maintenances.set(res);
        },
        complete: () => {
            this.isLoading.set(false)
        }
    });
  }
  maintenanceId = signal(0);
  date = signal((new Date()).toLocaleDateString());
  cost = signal(0);
  mileage = signal(0);

  onMaintenanceIdChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.maintenanceId.set(parseInt(input.value))
  }

  onCostChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cost.set(parseFloat(input.value))
  }

  
  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.date.set(input.value as any)
  }

  onMileageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.mileage.set(parseInt(input.value))
  }

  addMaintenanceId() {
    const dto: MaintenanceDto = {
        carVin: "PLACEHOLDER",
        cost: this.cost(),
        date: this.date(),
        id: this.maintenanceId(),
        itemDetails: [],
        mileage: this.mileage(),
        receipt: null,
    };
    this.maintenances.set([dto, ...this.maintenances()])
  }
}