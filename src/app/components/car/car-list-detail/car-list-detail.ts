import { Component, computed, input } from '@angular/core';
import { CarDto } from '@shared/models/dtos.interface';

@Component({
  selector: 'app-car-list-detail',
  imports: [],
  templateUrl: './car-list-detail.html',
  styleUrl: './car-list-detail.scss',
})
export class CarListDetail {
  public car = input.required<CarDto>();
}
