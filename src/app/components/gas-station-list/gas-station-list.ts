import { Component, inject, signal } from '@angular/core';
import { GasStationService } from '@services/gas-station.service';
import { GasStationDetail } from '../gas-station-detail/gas-station-detail';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-gas-station-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, GasStationDetail],
  templateUrl: './gas-station-list.html',
  styleUrl: './gas-station-list.scss',
})
export class GasStationList {
  readonly #gasStationService = inject(GasStationService);

  protected readonly gasStations = this.#gasStationService.gasStations;

  protected newStationName = signal('');

  protected onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newStationName.set(input.value);
  }

  protected addGasStation() {
    if (this.newStationName()) {
      this.#gasStationService.addGasStation(this.newStationName());
      this.newStationName.set('');
    }
  }
}
