import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaintenanceService } from '@services/maintenance.service';
import { MaintenanceDto } from '@shared/models/dtos.interface';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-maintenance-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './maintenance-form.html',
  styleUrl: './maintenance-form.scss',
})
export class MaintenanceForm {
  private readonly maintenanceService = inject(MaintenanceService);
  formBuilder = inject(FormBuilder);
  postMaintenanceError = signal('');
  form = this.formBuilder.group({
    cost: [0, Validators.required],
    date: [formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en-US'), Validators.required],
    mileage: [0, Validators.required],
  });

  get cost() {
    return this.form.get('cost')!;
  }

  get date() {
    return this.form.get('date')!;
  }

  get mileage() {
    return this.form.get('mileage')!;
  }

  onSubmit() {
    const dto: MaintenanceDto = {
      carVin: '1HGCM82633A004352',
      cost: this.cost.value!,
      date: new Date(this.date.value!).getTime() / 1000,
      id: 0,
      itemDetails: [],
      mileage: this.mileage.value!,
      receipt: null,
    };

    this.maintenanceService.postMaintenance(dto).subscribe({
      error: (err: HttpErrorResponse) => {
        this.postMaintenanceError.set(err.error ?? 'Could not create maintenance');
      },
    });
  }
}
