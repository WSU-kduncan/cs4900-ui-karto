import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, Field, required } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { RippleModule } from 'primeng/ripple';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload, FileUploadModule } from 'primeng/fileupload'

import { CarDto } from '@shared/models/dtos.interface';
import { CarService } from '@services/car.service';
import { GasService } from '@services/gas.service';
import { LocalStorageService } from '@services/local-storage.service';


@Component({
  selector: 'app-car-list-form',
  imports: [
    FormsModule,
    IftaLabelModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
    FileUploadModule,
    FileUpload,
    Select,
    Field,
  ],
  templateUrl: './car-list-form.html',
  styleUrl: './car-list-form.scss',
  standalone: true,
})
export class CarListForm {
  private readonly carService = inject(CarService);
  private readonly gasService = inject(GasService);
  private readonly localStorageService = inject(LocalStorageService);

  carModel = signal<CarDto>({
    vin: '56HJK4AE1BU3456AB',
    userEmail: this.localStorageService.email!,
    make: 'Honda',
    model: 'Accord',
    year: 2015,
    color: 'Dark Blue',
    image: '',
    mileage: 192168,
    gasTypeId: 1,
  });

  carForm = form(this.carModel, (schemaPath) => {
    required(schemaPath.vin, { message: 'VIN is required' });
    required(schemaPath.make, { message: 'Make is required' });
    required(schemaPath.model, { message: 'Model is required' });
    required(schemaPath.year, { message: 'Year is required' });
    required(schemaPath.color, { message: 'Color is required' });
    required(schemaPath.mileage, { message: 'Mileage is required' });
    required(schemaPath.gasTypeId, { message: 'Gas Type is required' });
  });

  readonly gasTypeOptions: Signal<{ name: string; value: number }[]> = signal(
    this.gasService.gasTypes().map((gt) => ({ name: gt.name, value: gt.id })),
  );

  // Accept any event shape because (onSelect) emits FileSelectEvent while (onUpload) emits FileUploadEvent
  onCarPictureUpload(event: any) {
    console.log('File Upload Event:', event);

    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      console.log('Base64 String:', base64String);
      console.log('File Upload Event:', file.name);


      this.carModel.update((car) => ({ ...car, image: base64String }));
    };
    reader.readAsDataURL(file);
  }

  onNewCar() {
    const newCar: CarDto = {
      vin: this.carForm.vin().value(),
      userEmail: this.carForm.userEmail().value(),
      make: this.carForm.make().value(),
      model: this.carForm.model().value(),
      year: this.carForm.year().value(),
      color: this.carForm.color().value(),
      mileage: this.carForm.mileage().value(),
      gasTypeId: this.carForm.gasTypeId().value(),
      image: this.carForm.image?.().value(),
    };

    this.carService.addCar(newCar);
  }
}
