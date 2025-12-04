import {
  Component,
  computed,
  effect,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, Field, required } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { RippleModule } from 'primeng/ripple';
import { Select } from 'primeng/select';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

import { CarDto } from '@shared/models/dtos.interface';
import { CarService } from '@services/car.service';
import { GasService } from '@services/gas.service';
import { LocalStorageService } from '@services/local-storage.service';
import { Fluid } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-car-list-form',
  imports: [
    FormsModule,
    IftaLabelModule,
    InputTextModule,
    InputNumberModule,
    RippleModule,
    ButtonModule,
    FileUploadModule,
    FileUpload,
    Select,
    Field,
    DrawerModule,
  ],
  templateUrl: './car-list-form.html',
  styleUrl: './car-list-form.scss',
  standalone: true,
})
export class CarListForm {
  private readonly carService = inject(CarService);
  private readonly gasService = inject(GasService);
  private readonly localStorageService = inject(LocalStorageService);

  private carImage = signal<File | null>(null);

  // public formOpen: InputSignal<boolean> = input.required<boolean>();
  // open = computed(() => this.formOpen());

  carModel = signal<CarDto>({
    vin: '',
    userEmail: this.localStorageService.email!,
    make: '',
    model: '',
    year: 0,
    color: '',
    image: '',
    mileage: 0,
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
    this.gasService.gasTypes().map((gt) => ({ name: gt.name, value: gt.id }))
  );

  onSelect(event: any) {
    this.carImage.set(event.files[0]);
  }

  cancelUpload() {
    this.carImage.set(null);
  }

  private async convertFileToBase64(file: File) {
    const bytes = await file.arrayBuffer();
    return btoa(String.fromCharCode(...new Uint8Array(bytes)));
  }

  async onNewCar() {
    let carImage = null;

    if (this.carImage()) carImage = await this.convertFileToBase64(this.carImage()!);

    const newCar: CarDto = {
      vin: this.carForm.vin().value(),
      userEmail: this.carForm.userEmail().value(),
      make: this.carForm.make().value(),
      model: this.carForm.model().value(),
      year: this.carForm.year().value(),
      color: this.carForm.color().value(),
      mileage: this.carForm.mileage().value(),
      gasTypeId: this.carForm.gasTypeId().value(),
      image: carImage,
    };

    this.carService.addCar(newCar);

    this.carForm.vin().reset();
    this.carForm.make().reset();
    this.carForm.model().reset();
    this.carForm.year().reset();
    this.carForm.color().reset();
    this.carForm.mileage().reset();
    this.carForm.gasTypeId().reset();
    this.carImage.set(null);
  }
}
