import {Component, input, LOCALE_ID} from '@angular/core';
import { GasPriceDto } from '@shared/models/dtos.interface';
import { PanelModule } from 'primeng/panel';
import {CurrencyPipe, formatDate} from '@angular/common';
import {Tab} from 'primeng/tabs';

@Component({
  selector: 'app-gas-price-detail',
  standalone: true,
  imports: [PanelModule, CurrencyPipe],
  templateUrl: './gas-price-detail.html',
  styleUrl: './gas-price-detail.scss',
})
export class GasPriceDetail {
  public price = input.required<GasPriceDto>();
  protected readonly formatDate = formatDate;
}
