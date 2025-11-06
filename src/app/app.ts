import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GasStationList } from './gas-station-list/gas-station-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GasStationList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('karto-ui');
}
