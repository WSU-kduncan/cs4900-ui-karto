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
    Button,
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
  private readonly router = inject(Router);

  constructor() {
    // Debugging effect to log cars whenever they change
    effect(() => {
      console.log('Cars list updated:', this.cars());
    });
    this.carService.updateCars();
  }

  cars = this.carService.cars;

  vin = signal<string>('KMHD4AE1BU345A78');
  make = signal<string>('Honda');
  model = signal<string>('Accord');
  year = signal<number | null>(2019);
  color = signal<string>('Red');
  mileage = signal<number | null>(12345);

  selectedCar = signal<SerializedCar | null>(null);

  readonly gasTypeOptions = this.gasService.gasTypes()?.map((gasType) => gasType.name) ?? [];

  onValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    switch (inputElement.name) {
      case 'vin':
        this.vin.set(value);
        break;
      case 'make':
        this.make.set(value);
        break;
      case 'model':
        this.model.set(value);
        break;
      case 'year':
        this.year.set(Number(value));
        break;
      case 'color':
        this.color.set(value);
        break;
      case 'mileage':
        this.mileage.set(Number(value));
        break;
      default:
        break;
    }
  }

  onSelectCar(car: SerializedCar) {
    this.selectedCar.set(car);
  }

  onViewMaintenances(e: PointerEvent) {
    this.router.navigate(['maintenances', this.selectedCar()?.vin!]);
  }

  onEditCar(e: PointerEvent) {}
}
