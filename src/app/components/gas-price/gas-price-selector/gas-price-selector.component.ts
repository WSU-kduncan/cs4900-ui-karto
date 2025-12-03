import { Component, inject } from '@angular/core';
import { CarService } from '@services/car.service';
import { LocalStorageService } from '@services/local-storage.service';
import { GasPriceList } from '@components/gas-price/gas-price-list/gas-price-list';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CarDto } from '@shared/models/dtos.interface';

@Component({
  selector: 'app-gas-price-selector',
  imports: [GasPriceList, Select, FormsModule],
  templateUrl: './gas-price-selector.component.html',
  styleUrl: './gas-price-selector.component.scss',
})
export class GasPriceSelector {
  readonly carService: CarService = inject(CarService);
  readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  private DEFAULT_EMAIL: string = 'irene.z@example.test';

  public carNames: NamedCar[] = [];
  public selectedCar: NamedCar | null = null;

  ngOnInit() {
    let userEmail = this.localStorageService.email;
    if (userEmail == null) userEmail = this.DEFAULT_EMAIL;

    this.carService.getCarsOwnedByUser(userEmail).subscribe((carDtos) => {
      carDtos.forEach((carDto) => {
        const carName: string = `${carDto.year} ${carDto.make} ${carDto.model}`;
        const namedCar: NamedCar = { name: carName, object: carDto };
        this.carNames.push(namedCar);
      });
    });
  }
}

interface NamedCar {
  name: string;
  object: CarDto;
}
