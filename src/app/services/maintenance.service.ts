import { Injectable, signal } from '@angular/core';
import { ApiService } from '@services/api.service';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { MaintenanceDto } from '@shared/models/dtos.interface';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private apiService: ApiService) {}

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
      receipt: new TextEncoder().encode('MQ=='),
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

  private maintenanceListSubject = new BehaviorSubject<MaintenanceDto[]>([]);

  get maintenanceList(): Observable<MaintenanceDto[]> {
    if (this.maintenanceListSubject.value.length == 0) this.updateMaintenanceList().subscribe();
    return this.maintenanceListSubject;
  }

  getMaintenancesByVin(id: string) {
    return this.apiService.get<MaintenanceDto[]>(`maintenance/car/${id}`).pipe(
      map((response) => response.data),
      catchError((err) => {
        console.log('API call failed, using mock data: ', err);
        return of(this.mockMaintenances);
      }),
    );
  }

  updateMaintenanceList() {
    return this.apiService.get<MaintenanceDto[]>('maintenance/all', { body: {} }).pipe(
      map((response) => {
        this.maintenanceListSubject.next(response.data);
        return response;
      }),
      catchError((error) => {
        console.error('API call failed, using mock data:', error);
        this.maintenanceListSubject.next(this.mockMaintenances);
        return of(this.mockMaintenances);
      }),
    );
  }

  postMaintenance(maintenanceDto: MaintenanceDto): Observable<MaintenanceDto> {
    return this.apiService.post<MaintenanceDto>('maintenance', maintenanceDto).pipe(
      map((res) => {
        this.updateMaintenanceList().subscribe();
        return res.data;
      }),
      catchError((error) => {
        console.error('API POST maintenance failed, using mock data: ', error);
        this.mockMaintenances.push(maintenanceDto);
        return of(maintenanceDto);
      }),
    );
  }

  deleteMaintenance(id: number): Observable<void> {
    return this.apiService.delete<void>(`maintenance/${id}`).pipe(
      map((_) => {
        this.updateMaintenanceList().subscribe();
      }),
      catchError((error) => {
        console.error('API Delete maintenance failed, using mock data: ', error);
        this.mockMaintenances = this.mockMaintenances.filter(
          (maintenance) => maintenance.id !== id,
        );
        this.updateMaintenanceList().subscribe();
        return of();
      }),
    );
  }
}
