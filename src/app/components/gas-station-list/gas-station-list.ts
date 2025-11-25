import { Component, inject } from '@angular/core';
import { GasStationService } from '../../services/gas-station.service';
import { GasStationDetail } from '../gas-station-detail/gas-station-detail';
import { GasStationForm } from '../gas-station-form/gas-station-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gas-station-list',
  standalone: true,
  imports: [ButtonModule, GasStationForm, GasStationDetail, RouterLink],
  templateUrl: './gas-station-list.html',
  styleUrl: './gas-station-list.scss',
})
export class GasStationList {
  readonly #gasStationService = inject(GasStationService);

  private refreshTrigger = new BehaviorSubject<void>(undefined);

  protected readonly gasStations = toSignal(
    this.refreshTrigger.pipe(switchMap(() => this.#gasStationService.getGasStations())),
    { initialValue: [] },
  );

  refreshList() {
    this.refreshTrigger.next();
  }

  deleteStation(id: number) {
    this.#gasStationService.deleteGasStation(id).subscribe(() => {
      this.refreshList();
    });
  }
}
