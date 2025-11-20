import { inject, Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ApiService } from '.';
import { GasPriceDto, GasTypeDto } from '@shared/models/dtos.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class GasService {
  private apiService = inject(ApiService);

  private gasPrices = new BehaviorSubject<GasPriceDto[]>([]);

  private dummyGasPrices = [
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
  ];

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
  ];

  constructor() {
    // initialize gasTypes here so ApiService is defined when getGasTypes() runs
    // this.gasTypes = toSignal(this.getGasTypes());
    console.log('GasService initialized', this.gasTypes());

  }

  getGasTypes(): Observable<GasTypeDto[]> {
    return this.apiService.get<GasTypeDto[]>('gas/types').pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching gas types:', error, 'Using mock data instead.');

        return of(this.mockGasTypes);
      }),
    );
  }

  getGasTypeById(id: number): Observable<GasTypeDto | undefined> {
    return this.getGasTypes().pipe(
      map((gasTypes) => gasTypes.find((gasType) => gasType.id === id)),
    );
  }

  // declare without initializing so we can create the signal after ApiService is
  // available (toSignal will subscribe immediately and ApiService must be defined)
  public gasTypes: Signal<GasTypeDto[]> = toSignal(this.getGasTypes(), {
    initialValue: []
  });

  getGasPriceList(): Observable<GasPriceDto[]> {
    if (this.gasPrices.value.length == 0) {
      this.updateGasPriceList().subscribe();
    }
    return this.gasPrices;
  }

  updateGasPriceList() {
    return this.apiService.get<GasPriceDto[]>('gas/prices', { body: {} }).pipe(
      map((response) => {
        this.gasPrices.next(response.data);
        return response.data;
      }),
      catchError((error) => {
        console.error('API call failed, using mock data:', error);
        this.gasPrices.next(this.dummyGasPrices);
        return of(this.dummyGasPrices);
      }),
    );
  }

  addGasPrice(request: GasPriceDto) {
    const newGasPrice: GasPriceDto = {
      id: request.id,
      price: request.price,
      updated: request.updated,
    };

    return this.apiService.post<GasPriceDto>('gas', newGasPrice).pipe(
      map((response) => {
        this.updateGasPriceList().subscribe();
        return response.data;
      }),
      catchError((error) => {
        console.error('API POST maintenance failed, using mock data: ', error);
        return of(this.dummyGasPrices);
      }),
    );
  }
}
