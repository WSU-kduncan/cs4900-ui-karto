import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrustedGasStation } from './trusted-gas-station/trusted-gas-station';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrustedGasStation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('karto-ui');
}
