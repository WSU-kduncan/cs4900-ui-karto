import { Injectable, signal, Signal } from '@angular/core';
import { ApiService } from './api.service';
import { CarDto, GasTypeDto, SerializedCar } from '@shared/models/dtos.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  // private readonly gasTypes: Signal<GasTypeDto[] | undefined> = toSignal(this.getGasTypes());

  constructor(private apiService: ApiService) { }

  getCarsOwnedByUser(userEmail: string): Observable<CarDto[]> {
    return this.apiService.get<CarDto[]>(`cars/ownedBy/${userEmail}`).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching cars owned by user:', error, 'Using mock data instead.');
        const car = this.mockCars.filter((car) => car.userEmail === userEmail);

        if (!car) throw new Error(`User with email ${userEmail} has no cars.`);

        return of(car);
      }),
    );
  }

  // cars: Signal<SerializedCar[] | undefined> = toSignal(this.getCarsOwnedByUser('irene.z@example.test').pipe(
  //   // Enrich cars with gas type names from gasTypes signal
  //   map(cars =>
  //     cars.map(car => {
  //       return {
  //         ...car,
  //         gasType: this.gasTypes()?.find(g => g.id === car.gasTypeId as number) as GasTypeDto
  //       }
  //     })
  //   )
  // ));  

  addCar(carDetails: Partial<CarDto>): void {
    this.cars.update(cars => [...cars, carDetails as CarDto]);
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
      gasTypeId: 7,
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
      gasTypeId: 1,
    }
  ]

  public cars = signal<CarDto[]>(this.mockCars);


}
