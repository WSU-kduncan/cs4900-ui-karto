import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CarDto } from '@shared/models/dtos.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  constructor(private apiService: ApiService) { }

  getCarsOwnedByUser(userEmail: string): Observable<CarDto[]> {
    return this.apiService.get<CarDto[]>(`cars/ownedBy/${userEmail}`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching cars owned by user:', error, 'Using mock data instead.');
        const car = this.mockCars.filter(car => car.userEmail === userEmail);

        if (!car) throw new Error(`User with email ${userEmail} has no cars.`);

        return of(car);
      })
    );
  }

  private mockCars: CarDto[] = [
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

}
