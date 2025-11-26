import { Injectable, inject } from '@angular/core';
import { GasStation } from '../shared/models/dtos.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pipe } from 'rxjs';
import { tap } from 'rxjs';
import { enviorment } from '../../enviornments/enviornment';

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

  private readonly baseUrl = `${enviorment.apiUrl}/gas-stations`;

  getGasStations(): Observable<GasStation[]> {
    return this.#http.get<GasStation[]>(this.baseUrl);
  }

  createGasStation(station: Partial<GasStation>): Observable<GasStation> {
    return this.#http.post<GasStation>(this.baseUrl, station);
  }

  deleteGasStation(id: number): Observable<unknown> {
    return this.#http.delete(`${this.baseUrl}/${id}`);
  }

  getGasStation(id: number): Observable<GasStation> {
    return this.#http.get<GasStation>(`${this.baseUrl}/${id}`);
  }

  updateGasStation(id: number, station: Partial<GasStation>): Observable<GasStation> {
    return this.#http.put<GasStation>(`${this.baseUrl}/${id}`, station);
  }
}
