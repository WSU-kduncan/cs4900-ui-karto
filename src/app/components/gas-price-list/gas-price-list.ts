import {Component, inject, Signal, signal} from '@angular/core';
import { GasService } from '@services/gas.service';
import { GasPriceDetail } from '../gas-price-detail/gas-price-detail';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {toSignal} from '@angular/core/rxjs-interop';
import {GasPriceDto} from '@shared/models/dtos.interface';

@Component({
  selector: 'app-gas-price-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, GasPriceDetail],
  templateUrl: './gas-price-list.html',
  styleUrl: './gas-price-list.scss',
})
export class GasPriceList {
  readonly #gasService = inject(GasService);

  public gasPrices: Signal<GasPriceDto[]> = toSignal(
    this.#gasService.getGasPriceList(),
    {
      initialValue: []
    }
  );

  newGasPriceValue = signal(0);
  newGasStationIDValue = signal(0);
  newGasTypeIDValue = signal(0);

  whenNewGasPriceGiven(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newGasPriceValue.set(Number(input.value));
  }

  whenNewGasStationIDGiven(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newGasStationIDValue.set(Number(input.value));
  }

  whenNewGasTypeIDGiven(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newGasTypeIDValue.set(Number(input.value));
  }

  addGasPrice() {
    if (this.newGasPriceValue() && this.newGasStationIDValue() && this.newGasTypeIDValue()) {
      const gasPriceDto: GasPriceDto = {
          id: {
            gasStationId: this.newGasStationIDValue(),
            gasTypeId: this.newGasTypeIDValue()
          },
          price: this.newGasPriceValue(),
          updated: new Date()
      }

      // add/post the new gas price
      this.#gasService.addGasPrice(gasPriceDto).subscribe();
    }
  }
}
