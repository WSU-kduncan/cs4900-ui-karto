import { Component } from '@angular/core';
import { MaintenanceDto } from '../../shared/models/dtos.interface';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-maintenance-list',
  imports: [DatePipe, CurrencyPipe, DecimalPipe],
  templateUrl: './maintenance-list.html',
  styleUrl: './maintenance-list.scss',
  standalone: true,
})
export class MaintenanceList {
  maintenances = [
    {
      id: 14,
      carVin: '1HGCM82633A004352',
      date: '2024-02-20T00:00:00Z',
      mileage: 64820,
      cost: 249.99,
      receipt: null,
      itemDetails: [
        {
          quantity: 2,
          comments: null,
          id: {
            maintenanceId: 14,
            maintenanceType: {
              id: 3,
              name: 'Battery Replacement',
            },
          },
        },
        {
          quantity: 5,
          comments: null,
          id: {
            maintenanceId: 14,
            maintenanceType: {
              id: 5,
              name: 'Wheel Alignment',
            },
          },
        },
        {
          quantity: 6,
          comments: null,
          id: {
            maintenanceId: 14,
            maintenanceType: {
              id: 9,
              name: 'Transmission Fluid Change',
            },
          },
        },
      ],
    },
    {
      id: 1,
      carVin: '1HGCM82633A004352',
      date: '2023-06-15T00:00:00Z',
      mileage: 63500,
      cost: 89.99,
      receipt: 'MQ==',
      itemDetails: [
        {
          quantity: 7,
          comments: null,
          id: {
            maintenanceId: 1,
            maintenanceType: {
              id: 1,
              name: 'Oil Change',
            },
          },
        },
        {
          quantity: 9,
          comments: null,
          id: {
            maintenanceId: 1,
            maintenanceType: {
              id: 3,
              name: 'Battery Replacement',
            },
          },
        },
        {
          quantity: 9,
          comments: null,
          id: {
            maintenanceId: 1,
            maintenanceType: {
              id: 8,
              name: 'Coolant Flush & Radiator Service',
            },
          },
        },
      ],
    },
  ] as MaintenanceDto[];
}
