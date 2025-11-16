import { Injectable, signal } from '@angular/core';
import { GasStation } from '../shared/models/dtos.interface';

@Injectable({
  providedIn: 'root',
})
export class GasStationService {
  readonly #gasStations = signal<GasStation[]>([]);

  public readonly gasStations = this.#gasStations.asReadonly();

  constructor() {
    this.#gasStations.set([
      { id: 1, name: 'Speedy Gas', address: '1234 Some St' },
      { id: 2, name: 'S&G', address: '5678 Other St' },
    ]);
  }

  addGasStation(name: string) {
    const newStation: GasStation = {
      id: this.#gasStations().length + 1,
      name: name,
      address: 'Address notta',
    };

    this.#gasStations.update((stations) => [...stations, newStation]);
  }
}
