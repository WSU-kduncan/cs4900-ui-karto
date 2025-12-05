import { EventEmitter, Injectable, signal } from '@angular/core';
import { ApiService } from '@services/api.service';
import { BehaviorSubject, catchError, finalize, map, Observable, of } from 'rxjs';
import {
  MaintenanceDto,
  MaintenanceStatisticsDto,
  MaintenanceTypeDescriptionDto,
} from '@shared/models/dtos.interface';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private apiService: ApiService) {}

  public maintenanceChanged = new EventEmitter();

  mockMaintenanceTypes: MaintenanceTypeDescriptionDto[] = [
    {
      id: 3,
      name: 'Battery Replacement',
    },
    {
      id: 8,
      name: 'Coolant Flush & Radiator Service',
    },
    {
      id: 1,
      name: 'Oil Change',
    },
    {
      id: 7,
      name: 'Spark Plug Replacement',
    },
    {
      id: 10,
      name: 'Timing Belt or Chain Replacement',
    },
    {
      id: 4,
      name: 'Tire Rotation & Balancing',
    },
    {
      id: 9,
      name: 'Transmission Fluid Change',
    },
    {
      id: 5,
      name: 'Wheel Alignment',
    },
  ];

  mockMaintenances: MaintenanceDto[] = [
    {
      id: 19,
      carVin: '1HGCM82633A004352',
      date: 1762977060.0,
      mileage: 3,
      cost: 3.0,
      receipt: null,
      itemDetails: [],
    },
    {
      id: 14,
      carVin: '1HGCM82633A004352',
      date: 1708387200.0,
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
      date: 1686787200.0,
      mileage: 63500,
      cost: 89.99,
      receipt: null,
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
  ];

  getMaintenancesByVin(id: string) {
    return this.apiService.get<MaintenanceDto[]>(`maintenance/car/${id}`).pipe(
      map((response) => response.data),
      catchError((err) => {
        console.log('API call failed, using mock data: ', err);
        return of(this.mockMaintenances);
      }),
    );
  }

  getMaintenanceTypes() {
    return this.apiService.get<MaintenanceTypeDescriptionDto[]>('maintenance/types').pipe(
      map((response) => {
        return response.data;
      }),
      catchError((error) => {
        console.error('API call failed, using mock data:', error);
        return of(this.mockMaintenanceTypes);
      }),
    );
  }

  postMaintenance(maintenanceDto: MaintenanceDto): Observable<MaintenanceDto> {
    return this.apiService.post<MaintenanceDto>('maintenance', maintenanceDto).pipe(
      map((res) => {
        return res.data;
      }),
      catchError((error) => {
        console.error('API POST maintenance failed, using mock data: ', error);
        this.mockMaintenances.push(maintenanceDto);
        return of(maintenanceDto);
      }),
      finalize(() => {
        this.maintenanceChanged.emit();
      }),
    );
  }

  getMaintenanceStatistics(vin: string): Observable<MaintenanceStatisticsDto> {
    return this.apiService.get<MaintenanceStatisticsDto>(`maintenance/statistics/${vin}`).pipe(
      map((res) => {
        return res.data;
      }),
      catchError((err) => {
        console.error('API GET maintenance statistics failed, using dumb data:', err);
        return of({
          totalCost: 0.0,
          numberMaintenances: 0,
          currentMileage: 0,
          lastUpdated: Date.now(),
        });
      }),
    );
  }

  deleteMaintenance(id: number): Observable<void> {
    return this.apiService.delete<void>(`maintenance/${id}`).pipe(
      map((_) => {}),
      catchError((error) => {
        console.error('API Delete maintenance failed, using mock data: ', error);
        this.mockMaintenances = this.mockMaintenances.filter(
          (maintenance) => maintenance.id !== id,
        );
        return of();
      }),
      finalize(() => {
        this.maintenanceChanged.emit();
      }),
    );
  }
}
