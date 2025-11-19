import { Component, effect, inject, Signal, signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { Button, ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CascadeSelect } from 'primeng/cascadeselect';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

import { CarDto, GasTypeDto, SerializedCar } from '@shared/models/dtos.interface';
import { CarListDetail } from "@components/car";
import { CarService } from '@services/car.service';
import { GasService } from '@services/gas.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-car-list',
  imports: [FormsModule, PanelModule, AvatarModule, Button, ButtonModule, IftaLabelModule, InputTextModule, RippleModule, CarListDetail],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class CarList {
  private readonly carService = inject(CarService);
  private readonly gasService = inject(GasService);

  constructor() {
    // Debugging effect to log cars whenever they change
    effect(() => {
      console.log('Cars list updated:', this.cars());
    });
  }

  /* carForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      mileage: new FormControl('', [Validators.required]),
      gasTypeId: new FormControl(1, [Validators.required])
    }
  ); */


  cars = this.carService.cars;

  vin = signal<string>('KMHD4AE1BU345A78');
  make = signal<string>('Honda');
  model = signal<string>('Accord');
  year = signal<number | null>(2019);
  color = signal<string>('Red');
  mileage = signal<number | null>(12345);


  selectedCar = signal<CarDto | null>(null);

  readonly gasTypeOptions = this.gasService.gasTypes()?.map(gasType => gasType.name) ?? []

  onValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value

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

  onNewCar() {
    const newCar = {
      vin: this.vin(),
      make: this.make(),
      model: this.model(),
      year: this.year() as number,
      color: this.color(),
      mileage: this.mileage() as number,
      gasTypeId: this.gasService.gasTypes()?.find(gasType => gasType.name === (this.gasTypeOptions[0]))?.id as number,
    }

    console.log(newCar);


    this.carService.addCar(newCar);
  }

  onSelectCar(car: CarDto) {
    this.selectedCar.set(car);
  }

  onViewMore(e: PointerEvent) {
  }

  onEditCar(e: PointerEvent) {
  }
}
