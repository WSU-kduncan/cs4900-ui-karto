import { Component, effect, inject, Signal, signal, ViewEncapsulation } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { Button } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { CarDto } from '@shared/models/dtos.interface';
import { CarListDetail } from "@components/car";
import { CarService } from '@services/car.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-car-list',
  imports: [PanelModule, AvatarModule, Button, RippleModule, CarListDetail],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class CarList {
  private readonly carService = inject(CarService);

  constructor() {
    effect(() => {
      console.log('Cars list updated:', this.cars());
    });
  }

  selectedCar = signal<CarDto | null>(null);

  cars: Signal<CarDto[] | undefined> = toSignal(this.carService.getCarsOwnedByUser('irene.z@example.test'));

  onSelectCar(car: CarDto) {
    this.selectedCar.update((curr) => curr?.vin === car.vin ? null : car);

    console.log('Selected car:', this.selectedCar());
  }

  onViewMore(e: PointerEvent, car: CarDto) {
    e.stopImmediatePropagation();

    console.log('View more details for car:', car);
  }

  onEditCar(e: PointerEvent, car: CarDto) {
    e.stopImmediatePropagation();

    console.log('Edit car:', car);
  }

}
