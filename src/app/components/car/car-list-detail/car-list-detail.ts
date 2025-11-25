import { Component, input, signal } from '@angular/core';
import { CarDto, SerializedCar } from '@shared/models/dtos.interface';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-car-list-detail',
  imports: [Button],
  templateUrl: './car-list-detail.html',
  styleUrl: './car-list-detail.scss',
})
export class CarListDetail {
  public car = input.required<SerializedCar>();
  public selectedCar = input.required<SerializedCar | null>();

  onViewMore(e: PointerEvent) { }

  onEditCar(e: PointerEvent) { }
}
