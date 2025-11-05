import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaintenanceList } from "./components/maintenance-list/maintenance-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaintenanceList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('karto-ui');
}
