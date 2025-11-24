import {inject, Injectable} from '@angular/core';
import { GasPriceDto } from '../shared/models/dtos.interface';
import { ApiService } from '@services/api.service';
import {BehaviorSubject, catchError, map, Observable, of, Subscription} from 'rxjs';

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
    }
  ]

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
      })
    );
  }

  addGasPrice(request: GasPriceDto) {
    const newGasPrice: GasPriceDto = {
      id: request.id,
      price: request.price,
      updated: request.updated,
    };

    return this.apiService.post<GasPriceDto>('gas', newGasPrice).pipe(
      map(response => {
        this.updateGasPriceList().subscribe();
        return response.data;
      }),
      catchError(error => {
        console.error('API POST gas price failed, using mock data: ', error);
        return of(this.dummyGasPrices.at(0));
      })
    ).subscribe();
  }
}
