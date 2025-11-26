import { Component, inject, OnInit, signal, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { GasStationService } from '../../services/gas-station.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gas-station-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  template: `
    <h2>{{ isEditMode() ? 'Edit' : 'Add' }} Gas Station</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="add-item-form">
      <input pInputText formControlName="name" placeholder="Name" />
      <input pInputText formControlName="addressLine" placeholder="Address" />
      <input pInputText formControlName="city" placeholder="City" />
      <input pInputText formControlName="state" placeholder="State" />
      <input pInputText formControlName="zip" placeholder="Zip" />

      <input pInputText formControlName="latitude" placeholder="Latitude" type="number" step="0.000001"/>
      <input pInputText formControlName="longitude" placeholder="Longitude" type="number" step="0.000001"/>

      <p-button
        type="submit"
        [label]="isEditMode() ? 'Update' : 'Add'"
        [disabled]="form.invalid"
      />
    </form>
  `,
  styles: [
    `
      .add-item-form {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class GasStationForm implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(GasStationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  stationAdded = output<void>();

  isEditMode = signal(false);
  currentId: number | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    addressLine: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    state: ['OH', Validators.required],
    latitude: [0.0, Validators.required],
    longitude: [0.0, Validators.required]
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode.set(true);
      this.currentId = +idParam;

      this.service.getGasStation(this.currentId).subscribe(data => {
        this.form.patchValue(data as any);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    if (this.isEditMode() && this.currentId) {
      this.service.updateGasStation(this.currentId, this.form.value as any).subscribe(() => {
        this.router.navigate(['/gas-stations']);
      });
    } else {
      this.service.createGasStation(this.form.value as any).subscribe(() => {
        if (this.route.snapshot.paramMap.get('id')) {
          this.router.navigate(['/gas-stations']);
        } else {
          this.form.reset({
            state: 'OH',
            latitude: 0.0,
            longitude: 0.0,
            name: '',
            addressLine: '',
            city: '',
            zip: ''
          });
          this.stationAdded.emit();
        }
      })
    }
  }
}
