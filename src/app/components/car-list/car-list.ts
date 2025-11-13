import { Component, signal, ViewEncapsulation } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { Button } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { Car } from '../../shared/models/dtos.interface';

@Component({
  selector: 'app-car-list',
  imports: [PanelModule, AvatarModule, Button, RippleModule],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class CarList {
  selectedCar = signal<Car | null>(null);

  cars: Car[] = [
    {
      vin: '1N4AL11D75C987654',
      userEmail: 'irene.z@example.test',
      make: 'Nissan',
      model: 'Altima',
      year: 2009,
      color: 'Maroon',
      mileage: 134500,
      gasType: {
        id: 7,
        name: 'Natural'
      }
    },
    {
      vin: 'KMHD4AE1BU345678',
      image: "https://placehold.co/800",
      userEmail: 'irene.z@example.test',
      make: 'Hyundai',
      model: 'Elantra',
      year: 2011,
      color: 'Blue',
      mileage: 1111300,
      gasType: {
        id: 1,
        name: 'Regular'
      }
    }
  ]

  onSelectCar(car: Car) {
    this.selectedCar.update((curr) => curr?.vin === car.vin ? null : car);

    console.log('Selected car:', this.selectedCar());
  }

  onViewMore(e: PointerEvent, car: Car) {
    e.stopImmediatePropagation();

    console.log('View more details for car:', car);
  }

  onEditCar(e: PointerEvent, car: Car) {
    e.stopImmediatePropagation();
    
    console.log('Edit car:', car);
  }

}
