import { Component, input } from '@angular/core';
import { MaintenanceDto } from '@shared/models/dtos.interface';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-maintenance-item',
  imports: [DatePipe, CurrencyPipe, DecimalPipe],
  standalone: true,
  templateUrl: './maintenance-detail.html',
  styleUrl: './maintenance-detail.scss',
})
export class MaintenanceItem {
  maintenance = input.required<MaintenanceDto>();
}
