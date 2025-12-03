import { Component, input } from '@angular/core';
import { GasPriceDto } from '@shared/models/dtos.interface';
import { PanelModule } from 'primeng/panel';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-gas-price-detail',
  standalone: true,
  imports: [PanelModule, CurrencyPipe],
  templateUrl: './gas-price-detail.html',
  styleUrl: './gas-price-detail.scss',
})
export class GasPriceDetail {
  public price = input.required<GasPriceDto>();
}
