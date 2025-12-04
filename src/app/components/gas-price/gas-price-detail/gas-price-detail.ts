import { Component, input, inject, signal } from '@angular/core';
import { GasPriceDto } from '@shared/models/dtos.interface';
import { PanelModule } from 'primeng/panel';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { GasService } from '@services/gas.service';

@Component({
  selector: 'app-gas-price-detail',
  standalone: true,
  imports: [PanelModule, CurrencyPipe, ButtonModule, InputNumberModule, FormsModule],
  templateUrl: './gas-price-detail.html',
  styleUrl: './gas-price-detail.scss',
})
export class GasPriceDetail {
  public price = input.required<GasPriceDto>();
  private gasService = inject(GasService);

  isEditing = signal(false);
  newPrice = signal<number>(0);

  onEdit() {
    this.newPrice.set(this.price().price);
    this.isEditing.set(true);
  }

  onCancel() {
    this.isEditing.set(false);
  }

  onSave() {
    const updatedDto: GasPriceDto = {
      ...this.price(),
      price: this.newPrice(),
    };

    this.gasService.updateGasPrice(updatedDto).subscribe(() => {
      this.isEditing.set(false);
    });
  }
}