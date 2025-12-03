import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SerializedCar } from '@shared/models/dtos.interface';
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

  constructor(private router: Router) {}

  onViewMore(e: PointerEvent) {
    console.log('View more clicked for car:', this.car().vin);

    this.router.navigate(['/maintenances', this.car().vin]);
  }

  onEditCar(e: PointerEvent) {}
}
