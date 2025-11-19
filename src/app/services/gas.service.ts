import { Injectable, signal, Signal } from "@angular/core";
import { ApiService } from ".";
import { catchError, map, Observable, of } from "rxjs";
import { GasPriceDto, GasTypeDto } from "@shared/models/dtos.interface";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root',
})
export class GasService {

  readonly #gasPrices = signal<GasPriceDto[]>([]);

  public readonly gasPrices = this.#gasPrices.asReadonly();

  private mockGasTypes: GasTypeDto[] = [
    { id: 1, name: 'Regular' },
    { id: 2, name: 'Mid-Grade' },
    { id: 3, name: 'Premium' },
    { id: 4, name: 'Diesel' },
    { id: 5, name: 'Biodiesel' },
    { id: 6, name: 'E85' },
    { id: 7, name: 'Natural' },
    { id: 8, name: 'Petroleum' },
    { id: 9, name: 'Hydrogen' },
    { id: 10, name: 'Electric' },
  ]


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


  getGasTypes(): Observable<GasTypeDto[]> {
    console.log(this.apiService);

    return this.apiService.get<GasTypeDto[]>('gas/types').pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching gas types:', error, 'Using mock data instead.');

        return of(this.mockGasTypes);
      })
    );
  }

  getGasTypeById(id: number): Observable<GasTypeDto | undefined> {
    return this.getGasTypes().pipe(
      map(gasTypes => gasTypes.find(gasType => gasType.id === id))
    );
  }

  // declare without initializing so we can create the signal after ApiService is
  // available (toSignal will subscribe immediately and ApiService must be defined)
  public gasTypes!: Signal<GasTypeDto[] | undefined>;

  constructor(private apiService: ApiService) {
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

    // initialize gasTypes here so ApiService is defined when getGasTypes() runs
    this.gasTypes = toSignal(this.getGasTypes());
  }

}
