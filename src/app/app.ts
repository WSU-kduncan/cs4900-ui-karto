import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Menubar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('karto-ui');

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Cars',
        icon: 'pi pi-fw pi-car',
        routerLink: ['/cars'],
      },
      {
        label: 'Maintenances',
        icon: 'pi pi-fw pi-wrench',
        routerLink: ['/maintenances'],
      },
      {
        label: 'Gas Prices',
        icon: 'pi pi-fw pi-dollar',
        routerLink: ['/prices'],
      },
      {
        label: 'Gas Stations',
        icon: 'pi pi-fw pi-map-marker',
        routerLink: ['/gas-stations'],
      }
    ];
  }
}
