import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GasService} from '@services/gas.service';
import {GasPriceDto} from '@shared/models/dtos.interface';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-gas-price-form',
  imports: [ReactiveFormsModule, FormsModule, Button],
  templateUrl: './gas-price-form.html',
  styleUrl: './gas-price-form.scss',
})
export class GasPriceForm {
  readonly #gasService: GasService = inject(GasService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  private DEFAULT_VALUE: number = -1;

  public form = this.formBuilder.group({
    gasStationId: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    gasTypeId: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    price: ['', [Validators.required, Validators.min(0.01), Validators.max(10)]],
    updated: [new Date(), [Validators.required]],
  })

  getGasStationId(): number {
    const gasStationId = this.form.value.gasStationId;
    if (gasStationId == null) return this.DEFAULT_VALUE!;
    return Number(gasStationId!);
  }

  getGasTypeId(): number {
    const gasTypeId = this.form.value.gasTypeId;
    if (gasTypeId == null) return this.DEFAULT_VALUE!;
    return Number(gasTypeId!);
  }

  getGasPrice(): number  {
    const gasPrice = this.form.value.price;
    if (gasPrice == null) return this.DEFAULT_VALUE!;
    return Number(gasPrice!);
  }

  getUpdated(): Date {
    const updated = this.form.value.updated;
    if (updated == null) return new Date()!;
    return updated!;
  }

  onSubmit() {
    const gasPriceDto: GasPriceDto = {
      id: {
        gasStationId: this.getGasStationId(),
        gasTypeId: this.getGasTypeId()
      },
      price: this.getGasPrice(),
      updated: this.getUpdated()
    }

    // add/post the new gas price
    this.#gasService.addGasPrice(gasPriceDto);
  }
}
