import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaintenanceService } from '@services/maintenance.service';
import {
  MaintenanceDto,
  MaintenanceItemDetailDto,
  MaintenanceTypeDescriptionDto,
} from '@shared/models/dtos.interface';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { IftaLabel } from 'primeng/iftalabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-maintenance-form',
  imports: [
    ReactiveFormsModule,
    Button,
    Select,
    IftaLabel,
    DatePickerModule,
    InputNumberModule,
    InputText,
    FileUploadModule,
  ],
  templateUrl: './maintenance-form.html',
  styleUrl: './maintenance-form.scss',
})
export class MaintenanceForm implements OnInit {
  private readonly maintenanceService = inject(MaintenanceService);
  vin = input.required<string>();
  onSuccessfulSubmit = output();

  formBuilder = inject(FormBuilder);
  postMaintenanceError = signal('');
  form = this.formBuilder.group({
    cost: [0, Validators.required],
    date: [new Date(), Validators.required],
    mileage: [0, Validators.required],
    itemDetails: this.formBuilder.array([]),
  });
  receipt: File | null = null;

  mapTypes = signal<MaintenanceTypeDescriptionDto[]>([]);

  ngOnInit(): void {
    this.maintenanceService.getMaintenanceTypes().subscribe({
      next: (types) => {
        this.mapTypes.set(types);
      },
    });
  }

  createItemDetailForm() {
    return this.formBuilder.group({
      quantity: [1, Validators.required],
      comments: ['', Validators.maxLength(255)],
      maintenanceType: [0, Validators.required],
    });
  }

  addItemDetailForm() {
    this.itemDetails.push(this.createItemDetailForm());
  }

  removeItemDetailForm(i: number) {
    this.itemDetails.removeAt(i);
  }

  get itemDetails() {
    return this.form.get('itemDetails')! as FormArray<ReturnType<typeof this.createItemDetailForm>>;
  }

  get cost() {
    return this.form.get('cost')!;
  }

  get date() {
    return this.form.get('date')!;
  }

  get mileage() {
    return this.form.get('mileage')!;
  }

  onSelect(event: any) {
    this.receipt = event.files[0];
  }

  onCancel() {
    this.receipt = null;
  }

  async onSubmit() {
    const details: MaintenanceItemDetailDto[] = this.itemDetails.value.map((v) => ({
      comments: v.comments!,
      quantity: v.quantity!,
      id: {
        maintenanceId: 0,
        maintenanceType: {
          id: v.maintenanceType!,
          name: '',
        },
      },
    }));
    const toBase64 = async () => {
      const bytes = new Uint8Array(await this.receipt!.arrayBuffer());
      let binary = '';
      bytes.forEach(b => binary += String.fromCharCode(b));
      return btoa(binary);
    }
    const dto: MaintenanceDto = {
      carVin: this.vin(),
      cost: this.cost.value!,
      date: new Date(this.date.value!).getTime() / 1000,
      id: 0,
      itemDetails: details,
      mileage: this.mileage.value!,
      receipt: this.receipt ? await toBase64() : null,
    };
    console.log(dto.receipt)
    this.maintenanceService.postMaintenance(dto).subscribe({
      next: (_) => {
        this.onSuccessfulSubmit.emit();
      },
      error: (err: HttpErrorResponse) => {
        this.postMaintenanceError.set(err.error ?? 'Could not create maintenance');
      },
    });
  }
}
