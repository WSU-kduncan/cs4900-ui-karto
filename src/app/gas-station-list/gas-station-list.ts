import { Component } from '@angular/core';


interface GasStation {
  id: number;
  name: string;
}

@Component({
  selector: 'app-gas-station-list',
  standalone: true,
  imports: [],
  templateUrl: './gas-station-list.html',
  styleUrl: './gas-station-list.scss',
})
export class GasStationList {
  public gas_stations: GasStation[] = [
    { id: 1, name: 'Speed Way' },
    { id: 3, name: 'S&G Station' },
  ];
}
