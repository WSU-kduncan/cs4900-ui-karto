import { Component, inject, OnInit, signal } from '@angular/core';
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
export class GasStationList implements OnInit {
  readonly #gasStationService = inject(GasStationService);
  readonly #userService = inject(UserService);
  readonly #localStorage = inject(LocalStorageService);

  private refreshTrigger = new BehaviorSubject<void>(undefined);

  protected readonly gasStations = toSignal(
    this.refreshTrigger.pipe(switchMap(() => this.#gasStationService.getGasStations())),
    { initialValue: [] },
  );

  protected trustedStationIds = signal<number[]>([]);

  ngOnInit() {
    this.fetchTrustedStations();
  }

  fetchTrustedStations() {
    const email = this.#localStorage.email;
    if (email) {
      this.#userService.getTrustedGasStations(email).subscribe({
        next: (stations) => {
          this.trustedStationIds.set(stations.map((s) => s.id));
        },
      });
    }
  }

  refreshList() {
    this.refreshTrigger.next();
  }

  deleteStation(id: number) {
    this.#gasStationService.deleteGasStation(id).subscribe(() => {
      this.refreshList();
    });
  }

  toggleTrustStation(id: number) {
    const email = this.#localStorage.email;
    if (!email) {
      console.error('No user email found');
      return;
    }
    if (this.trustedStationIds().includes(id)) {
      this.#userService.removeTrustedGasStation(email, id).subscribe({
        next: () => {
          console.log('Station removed from trusted list');
          this.fetchTrustedStations();
        },
        error: (err) => console.error('Error removing trust', err),
      });
    } else {
      this.#userService.addTrustedGasStation(email, id).subscribe({
        next: () => {
          console.log('Station added to trusted list');
          this.fetchTrustedStations();
        },
        error: (err) => console.error('Error adding trust', err),
      });
    }
  }
}
