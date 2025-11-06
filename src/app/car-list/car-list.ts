import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Car {
  id: string;
  name: string;
}

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
})
export class CarList {
  public cars: Car[] = [
    { id: 'VIN12345CBA', name: '2015 Kia Optima' },
    { id: 'VIN4567DBAD', name: '1995 Mazda Miata' },
  ];
}
