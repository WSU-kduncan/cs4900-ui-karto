import { Component, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { Button, ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

import { SerializedCar } from '@shared/models/dtos.interface';
import { CarListDetail, CarListForm } from '@components/car';
import { CarService } from '@services/car.service';
import { GasService } from '@services/gas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  imports: [
    FormsModule,
    PanelModule,
    AvatarModule,
    ButtonModule,
    IftaLabelModule,
    InputTextModule,
    RippleModule,
    CarListDetail,
    CarListForm,
  ],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class CarList {
  private readonly carService = inject(CarService);
  private readonly gasService = inject(GasService);

  selectedCar = signal<SerializedCar | null>(null);

  constructor() {
    // Debugging effect to log cars whenever they change
    effect(() => {
      console.log('Cars list updated:', this.cars());
    });
    this.carService.updateCars();
  }

  cars = this.carService.cars;
  readonly gasTypeOptions = this.gasService.gasTypes()?.map((gasType) => gasType.name) ?? [];

  onSelectCar(car: SerializedCar) {
    this.selectedCar.set(car);
  }

}
