import { Component } from '@angular/core';

interface TrustedGasStationStruct {
  gasStationId: number;
  name: string;
}

@Component({
  selector: 'app-trusted-gas-station',
  imports: [],
  templateUrl: './trusted-gas-station.html',
  styleUrl: './trusted-gas-station.scss',
})
export class TrustedGasStation {
  public trusted_gas_stations: TrustedGasStationStruct[] = [
    { gasStationId: 1, name: "speeeeeeedway" },
    { gasStationId: 2, name: "sheeeeeeeetz" },
  ]
}
