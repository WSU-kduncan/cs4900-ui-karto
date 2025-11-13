import { Component, ViewEncapsulation } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-car-list',
  imports: [PanelModule, AvatarModule],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class CarList {
  cars = [
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
        name: 'Natural',
      },
    },
    {
      vin: 'KMHD4AE1BU345678',
      image: 'https://placehold.co/800',
      userEmail: 'irene.z@example.test',
      make: 'Hyundai',
      model: 'Elantra',
      year: 2011,
      color: 'Blue',
      mileage: 1111300,
      gasType: {
        id: 1,
        name: 'Regular',
      },
    },
  ];
}
