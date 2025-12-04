import { Component, computed, inject, input, OnInit, signal, Signal } from '@angular/core';
import { GasService } from '@services/gas.service';
import { GasPriceDetail } from '../gas-price-detail/gas-price-detail';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarDto, GasPriceDto, GasStationDto, GasTypeDto } from '@shared/models/dtos.interface';
import { GasStationService } from '@services/gas-station.service';
import { UserService } from '@services/user.service';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-gas-price-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, GasPriceDetail, PanelModule],
  templateUrl: './gas-price-list.html',
  styleUrl: './gas-price-list.scss',
})
export class GasPriceList implements OnInit {
  readonly gasService = inject(GasService);
  readonly gasStationService = inject(GasStationService);

  readonly userService = inject(UserService);
  readonly localStorage = inject(LocalStorageService);

  private dummyStation: GasStationDto = {
    id: -1,
    longitude: 0,
    latitude: 0,
    name: 'Dummy Station',
    addressLine: '123 Test St',
    city: 'Dummy City',
    state: 'DUMMY',
    zip: '12345',
    userEmails: [],
  };

  private gasTypes = signal<GasTypeDto[]>([
    { name: 'Regular', id: 1 },
    { name: 'Mid-Grade', id: 2 },
    { name: 'Premium', id: 3 },
    { name: 'Diesel', id: 4 },
    { name: 'Biodiesel', id: 5 },
    { name: 'E85', id: 6 },
    { name: 'Natural', id: 7 },
    { name: 'Petroleum', id: 8 },
    { name: 'Hydrogen', id: 9 },
    { name: 'Electric', id: 10 },
  ]);

  public car = input.required<CarDto>();

  public gasStations: GasStationDto[] = [];
  public trustedStationIds = signal<number[]>([]);

  public gasPrices: Signal<GasPriceDto[]> = toSignal(this.gasService.getGasPriceList(), {
    initialValue: [],
  });

  public relevantGasPrices = computed(() => {
    const requiredType = this.car().gasTypeId;
    return this.gasPrices().filter((p) => p.id.gasTypeId === requiredType);
  });

  public trustedPrices = computed(() => {
    return this.relevantGasPrices().filter((p) =>
      this.trustedStationIds().includes(p.id.gasStationId)
    );
  });

  public regularPrices = computed(() => {
    return this.relevantGasPrices().filter(
      (p) => !this.trustedStationIds().includes(p.id.gasStationId)
    );
  });

  ngOnInit() {
    this.gasStationService.getGasStations().subscribe({
      next: (value) => {
        value.forEach((gasStation) => this.gasStations.push(gasStation));
      },
    });
    this.gasService.getGasTypes().subscribe({
      next: (value) => {
        this.gasTypes.set(value);
      },
    });

    const email = this.localStorage.email;
    if (email) {
      this.userService.getTrustedGasStations(email).subscribe({
        next: (stations) => {
          this.trustedStationIds.set(stations.map((s) => s.id));
        },
      });
    }
  }

  public getGasStation(gasStationId: number): GasStationDto {
    let gasStation: GasStationDto = this.dummyStation;
    this.gasStations.forEach((station) => {
      if (station.id == gasStationId) {
        gasStation = station;
      }
    });
    return gasStation;
  }

  public getGasTypeName(gasTypeId: number): string {
    let gasTypeName: string = 'Default Gas Type Name';
    this.gasTypes().forEach((gasType) => {
      if (gasType.id == gasTypeId) {
        gasTypeName = gasType.name;
      }
    });
    return gasTypeName;
  }
}