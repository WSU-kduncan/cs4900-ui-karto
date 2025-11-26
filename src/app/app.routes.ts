import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'cars',
    loadComponent: () => import('@components/car/car-list/car-list').then((m) => m.CarList),
  },
  {
    path: 'maintenances',
    loadComponent: () =>
      import('@components/maintenance/maintenance-list/maintenance-list').then(
        (m) => m.MaintenanceList,
      ),
  },
  {
    path: 'prices',
    loadComponent: () =>
      import('@components/gas-price-list/gas-price-list').then((m) => m.GasPriceList),
  },
  {
    path: 'gas-stations',
    loadComponent: () =>
      import('@components/gas-station-list/gas-station-list').then((m) => m.GasStationList),
  },
  {
    path: 'create-account',
    loadComponent: () =>
      import('./components/create-account-form/create-account-form').then((m) => m.CreateAccountForm),
  },
  {
    path: 'login',
    loadComponent: () => import('@components/login/login').then((m) => m.Login),
  },
  {
    path: 'gas-stations/edit/:id',
    loadComponent: () =>
      import('./components/gas-station-form/gas-station-form').then((m) => m.GasStationForm),
  },
  {
    path: '**',
    loadComponent: () => import('@components/not-found/not-found').then((m) => m.NotFound),
  },
];
