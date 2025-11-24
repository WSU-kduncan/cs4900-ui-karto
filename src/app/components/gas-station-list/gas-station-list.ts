import { Component, inject } from '@angular/core';
import { GasStationService } from '../../services/gas-station.service';
import { GasStationDetail } from '../gas-station-detail/gas-station-detail';
import { toSignal } from '@angular/core/rxjs-interop'; //

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

  protected readonly gasStations = toSignal(this.#gasStationService.getGasStations(), {
    initialValue: [],
  });
}
