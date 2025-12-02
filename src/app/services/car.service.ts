import { Injectable, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ApiService } from './api.service';
import { CarDto, GasTypeDto, SerializedCar } from '@shared/models/dtos.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { GasService } from './gas.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  // private readonly gasTypes: Signal<GasTypeDto[] | undefined> = toSignal(this.getGasTypes());
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
    },
  ];

  constructor(
    private apiService: ApiService,
    private gasService: GasService,
    private localStorageService: LocalStorageService
  ) {
    this.updateCars();
  }
  updateCars() {
    if (!this.localStorageService.email) throw new Error('No user email found in localStorage');
    this.getCarsOwnedByUser(this.localStorageService.email)
      .pipe(
        // Enrich cars with gas type names from gasTypes signal
        map((cars) => cars.map((car) => this.serializeCar(car)))
      )
      .subscribe((cars) => this.cars.set(cars as SerializedCar[]));
  }

  // Helper
  private serializeCar(car: CarDto): SerializedCar {
    return {
      ...car,
      gasType: this.gasService
        .gasTypes()
        .find((g) => g.id === (car.gasTypeId as number)) as GasTypeDto,
    };
  }

  getCarsOwnedByUser(userEmail: string): Observable<CarDto[]> {
    return this.apiService.get<CarDto[]>(`cars/ownedBy/${userEmail}`).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error fetching cars owned by user:', error, 'Using mock data instead.');
        const car = this.mockCars.filter((car) => car.userEmail === userEmail);

        if (!car) throw new Error(`User with email ${userEmail} has no cars.`);

        return of(car);
      })
    );
  }

  addCar(carDetails: Partial<CarDto>): void {
    this.apiService.post<CarDto>('cars', carDetails).subscribe({
      next: (response) => {
        const newCar = response.data;
        // Enrich new car with gas type
        const enrichedCar: SerializedCar = this.serializeCar(newCar);
        this.cars.update((cars) => [...cars, enrichedCar]);
      },
      error: (error) => {
        console.error('Error adding new car:', error);
      },
    });
    // this.cars.update((cars) => [...cars, this.serializeCar(carDetails as CarDto)]);
  }

  public cars: WritableSignal<SerializedCar[]> = signal<SerializedCar[]>([]);
}
