import {Component, inject, Signal, signal} from '@angular/core';
import { GasService } from '@services/gas.service';
import { GasPriceDetail } from '../gas-price-detail/gas-price-detail';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { toSignal } from '@angular/core/rxjs-interop';
import { GasPriceDto } from '@shared/models/dtos.interface';
import {GasPriceForm} from '@components/gas-price-form/gas-price-form';

@Component({
  selector: 'app-gas-price-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, GasPriceDetail, GasPriceForm],
  templateUrl: './gas-price-list.html',
  styleUrl: './gas-price-list.scss',
})
export class GasPriceList {
  readonly #gasService = inject(GasService);

  public currentGasStationId: number = -1;

  public gasPrices: Signal<GasPriceDto[]> = toSignal(
    this.#gasService.getGasPriceList(),
    {
      initialValue: []
    }
  );

  public updateTrackedGasStationId(newId: number ) {
    this.currentGasStationId = newId;
  }
}
