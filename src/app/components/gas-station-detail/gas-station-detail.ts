import { Component, input } from '@angular/core';
import { GasStation } from '../../shared/models/dtos.interface';

import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-gas-station-detail',
  standalone: true,
  imports: [PanelModule],
  templateUrl: './gas-station-detail.html',
  styleUrl: './gas-station-detail.scss',
})
export class GasStationDetail {
  public station = input.required<GasStation>();
}
