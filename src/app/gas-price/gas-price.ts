import { Component } from '@angular/core';

interface GasPriceStruct {
  gasPriceId: number;
  price: number;
  updated: Date
}

@Component({
  selector: 'app-gas-price',
  imports: [],
  templateUrl: './gas-price.html',
  styleUrl: './gas-price.scss',
})
export class GasPrice {
  public gas_prices: GasPriceStruct[] = [
    { gasPriceId: 1, price: 1.208, updated: new Date() },
    { gasPriceId: 2, price: 1.220, updated: new Date() },
    { gasPriceId: 3, price: 1.119, updated: new Date() }
  ]
}
