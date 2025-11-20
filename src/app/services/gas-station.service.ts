import { Injectable, inject } from '@angular/core';
import { GasStationDto } from '../shared/models/dtos.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pipe } from 'rxjs';

const GAS_STATION_API_URL = 'https://jsonplaceholder.typicode.com/users';

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

  getGasStations(): Observable<GasStationDto[]> {
    return this.#http.get<PlaceholderUser[]>(GAS_STATION_API_URL).pipe(
      map((users) =>
        users.map(
          (user) =>
            ({
              id: user.id,
              longitude: Math.random(),
              latitude: Math.random(),
              name: user.name,
              addressLine: user.address.street,
              city: user.address.city,
              state: 'OH',
              zip: user.address.zipcode,
              userEmails: [user.email],
            }) as GasStationDto,
        ),
      ),
    );
  }
}
