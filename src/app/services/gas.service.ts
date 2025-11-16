import { Injectable, signal } from '@angular/core';
import { GasPriceDto } from '../shared/models/dtos.interface';

@Injectable({
  providedIn: 'root',
})
export class GasService {
  readonly #gasPrices = signal<GasPriceDto[]>([]);

  public readonly gasPrices = this.#gasPrices.asReadonly();

  constructor() {
    this.#gasPrices.set([
      {
        id: {
          gasStationId: 1,
          gasTypeId: 2,
        },
        price: 1.0875,
        updated: new Date(),
      },
      {
        id: {
          gasStationId: 1,
          gasTypeId: 3,
        },
        price: 1.667,
        updated: new Date(),
      },
    ]);
  }

  addGasPrice(gasStationId: number, gasTypeId: number, price: number, updated: Date) {
    const newGasPrice: GasPriceDto = {
      id: {
        gasStationId: gasStationId,
        gasTypeId: gasTypeId,
      },
      price: price,
      updated: updated,
    };

    this.#gasPrices.update((prices) => [...prices, newGasPrice]);
  }
}
