import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Output,
  Signal,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Field, form } from '@angular/forms/signals';
import { CarService } from '@services/car.service';
import { GasService } from '@services/index';
import { CarDto, SerializedCar } from '@shared/models/dtos.interface';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-car-edit-form',
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
  ],
  templateUrl: './car-edit-form.html',
  styleUrl: './car-edit-form.scss',
  standalone: true,
})
export class CarEditForm {
  @Output() closeForm = new EventEmitter<boolean>();
  private readonly carService = inject(CarService);
  private readonly gasService = inject(GasService);

  public selectedCar = input<SerializedCar | null>();
  file = signal<File | null>(null);
  car = computed(() => this.selectedCar());

  editModel = signal<Partial<CarDto>>({
    make: this.car()?.make,
    model: this.car()?.model,
    year: this.car()?.year,
    color: this.car()?.color,
    gasTypeId: this.car()?.gasType.id,
    mileage: this.car()?.mileage,
    image: this.car()?.image,
  });

  editForm = form(this.editModel);

  ngOnInit() {
    this.editModel.set({
      make: this.car()?.make,
      model: this.car()?.model,
      year: this.car()?.year,
      color: this.car()?.color,
      gasTypeId: this.car()?.gasType.id,
      mileage: this.car()?.mileage,
      image: this.car()?.image,
    });
  }

  readonly gasTypeOptions: Signal<{ name: string; value: number }[]> = signal(
    this.gasService.gasTypes().map((gt) => ({ name: gt.name, value: gt.id }))
  );

  onSelect(event: any) {
    this.file.set(event.files[0]);
  }

  cancelUpload() {
    this.file.set(null);
  }

  async onEditCar() {
    let carImage = null;

    if (this.file()) carImage = await this.carService.convertFileToBase64(this.file()!);

    // Vin and userEmail are immutable

    const updatedCar: Partial<CarDto> = {
      vin: this.car()?.vin,
      userEmail: this.car()?.userEmail,
      make: this.editModel().make,
      model: this.editModel().model,
      year: this.editModel().year,
      color: this.editModel().color,
      gasTypeId: this.editModel().gasTypeId,
      mileage: this.editModel().mileage,
      image: carImage ?? this.editModel().image,
    };

    this.carService.editCar(updatedCar as CarDto);

    this.closeForm.emit(true);
  }
}
