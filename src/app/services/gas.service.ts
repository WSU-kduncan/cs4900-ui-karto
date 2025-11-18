import {inject, Injectable, signal} from '@angular/core';
import { GasPriceDto } from '../shared/models/dtos.interface';
import { ApiService } from '@services/api.service';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GasService {
  private apiService = inject(ApiService);

  private gasPrices = signal<GasPriceDto[]>([]);

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
    }
  ]

  getGasPriceList(): Observable<GasPriceDto[]> {
    if (this.gasPrices().length == 0) {
      this.updateGasPriceList().subscribe();
    }
    return of(this.gasPrices());
  }

  updateGasPriceList() {
    return this.apiService.get<GasPriceDto[]>('prices/all', { body: {} }).pipe(
      map((response) => {
        this.gasPrices.set(response.data);
        return response;
      }),
      catchError((error) => {
        console.error('API call failed, using mock data:', error);
        this.gasPrices.set(this.dummyGasPrices);
        return of(this.dummyGasPrices);
      })
    );
  }

  addGasPrice(request: GasPriceDto) {
    const newGasPrice: GasPriceDto = {
      id: request.id,
      price: request.price,
      updated: request.updated,
    };

    return this.apiService.post<GasPriceDto>('prices', newGasPrice).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('API POST maintenance failed, using mock data: ', error);
        return of(this.dummyGasPrices);
      })
    );
  }
}
