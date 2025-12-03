import { Component, inject } from '@angular/core';
import { GasStationService } from '../../services/gas-station.service';
import { GasStationDetail } from '../gas-station-detail/gas-station-detail';
import { GasStationForm } from '../gas-station-form/gas-station-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { UserService } from '@services/user.service';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-gas-station-list',
  standalone: true,
  imports: [ButtonModule, GasStationForm, GasStationDetail, RouterLink],
  templateUrl: './gas-station-list.html',
  styleUrl: './gas-station-list.scss',
})
export class GasStationList {
  readonly #gasStationService = inject(GasStationService);
  readonly userService: UserService = inject(UserService);
  readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  private refreshTrigger = new BehaviorSubject<void>(undefined);
  private DEFAULT_EMAIL: string = 'irene.z@example.test'

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

  addTrustedGasStation(gasStationId: number): void {
    let userEmail = this.localStorageService.email;
    if (userEmail == null) userEmail = this.DEFAULT_EMAIL;

    if(this.userService.addTrustedGasStation(userEmail, gasStationId)) {
      console.log('Success! TrustedGasStation added!')
    }
    else {
      console.log('Error! TrustedGasStation not added!')
    }
  }
}
