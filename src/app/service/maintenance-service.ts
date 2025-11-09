import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { MaintenanceDto } from '../shared/models/dtos.interface';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private apiService: ApiService) {}
  getMaintenance(): Observable<MaintenanceDto[]> {
    return this.apiService
      .get<MaintenanceDto[]>('maintenance/all', {body: {}})
      .pipe(map((response) => response.data));
  }
}
