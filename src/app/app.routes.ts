import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cars',
    loadComponent: () => import('./components/car-list/car-list').then((m) => m.CarList),
  },
  {
    path: 'maintenances',
    loadComponent: () =>
      import('./components/maintenance-list/maintenance-list').then((m) => m.MaintenanceList),
  },
  {
    path: 'gas-stations',
    loadComponent: () =>
      import('./components/gas-station-list/gas-station-list').then((m) => m.GasStationList),
  },
];
