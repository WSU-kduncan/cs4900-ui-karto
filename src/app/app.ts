import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { GasStationList } from './gas-station-list/gas-station-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('karto-ui');
}
