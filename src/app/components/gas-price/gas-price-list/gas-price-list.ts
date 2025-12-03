import { Component, inject, input, signal, Signal, WritableSignal } from '@angular/core';
import { GasService } from '@services/gas.service';
import { GasPriceDetail } from '../gas-price-detail/gas-price-detail';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarDto, GasPriceDto, GasStationDto } from '@shared/models/dtos.interface';
import { GasStationService } from '@services/gas-station.service';

@Component({
  selector: 'app-gas-price-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, GasPriceDetail],
  templateUrl: './gas-price-list.html',
  styleUrl: './gas-price-list.scss',
})
export class GasPriceList {
  readonly gasService = inject(GasService);
  readonly gasStationService = inject(GasStationService);

  private dummyStation: GasStationDto = {
    id: -1,
    longitude: 0,
    latitude: 0,
    name: 'Dummy Station',
    addressLine: '123 Test St',
    city: "Dummy City",
    state: "DUMMY",
    zip: "12345",
    userEmails: []
  }

  public currentGasStation: WritableSignal<GasStationDto> = signal(this.dummyStation);

  public car = input.required<CarDto>();

  public gasPrices: Signal<GasPriceDto[]> = toSignal(this.gasService.getGasPriceList(), {
    initialValue: [],
  });

  public setCurrentGasStation(gasStationId: number): void {
    this.gasStationService.getGasStation(gasStationId).subscribe({
      next: gasStationDto => {
        this.currentGasStation.set(gasStationDto);
      },
      error: () => {
        console.error("Failed to get gas station from given ID. Using dummy data instead");
        this.currentGasStation.set(this.dummyStation);
      }
    });
  }
}
