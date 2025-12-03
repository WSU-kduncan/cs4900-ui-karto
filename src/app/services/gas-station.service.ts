import { Injectable, inject } from '@angular/core';
import { GasStationDto } from '../shared/models/dtos.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

interface PlaceholderUser {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GasStationService {
  readonly #http = inject(HttpClient);

  private readonly baseUrl = `${environment.apiUrl}/gasstation`;

  getGasStations(): Observable<GasStationDto[]> {
    return this.#http.get<GasStationDto[]>(this.baseUrl);
  }

  createGasStation(station: Partial<GasStationDto>): Observable<GasStationDto> {
    return this.#http.post<GasStationDto>(this.baseUrl, station);
  }

  deleteGasStation(id: number): Observable<unknown> {
    return this.#http.delete(`${this.baseUrl}/${id}`);
  }

  getGasStation(id: number): Observable<GasStationDto> {
    return this.#http.get<GasStationDto>(`${this.baseUrl}/${id}`);
  }

  updateGasStation(id: number, station: Partial<GasStationDto>): Observable<GasStationDto> {
    return this.#http.put<GasStationDto>(`${this.baseUrl}/${id}`, station);
  }
}
