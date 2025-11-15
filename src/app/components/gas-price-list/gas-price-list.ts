import { Component, inject, signal } from '@angular/core';
import { GasService } from '../../services/gas.service';
import { GasPriceDetail } from '../gas-price-detail/gas-price-detail';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-gas-price-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, GasPriceDetail],
  templateUrl: './gas-price-list.html',
  styleUrl: './gas-price-list.scss',
})
export class GasPriceList {
  readonly #gasService = inject(GasService);
  readonly gasPrices = this.#gasService.gasPrices;

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

  protected addGasPrice() {
    if (this.newGasPriceValue() && this.newGasStationIDValue() && this.newGasTypeIDValue()) {
      // add the gas price
      this.#gasService.addGasPrice(
        this.newGasStationIDValue(),
        this.newGasTypeIDValue(),
        this.newGasPriceValue(),
        new Date(),
      );

      // reset signals
      this.newGasPriceValue.set(0);
      this.newGasStationIDValue.set(0);
      this.newGasTypeIDValue.set(0);
    }
  }
}
