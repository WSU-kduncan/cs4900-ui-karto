import { Routes } from '@angular/router';
import { CarList } from '@components/car/car-list/car-list';
import { CreateAccountForm } from '@components/create-account-form/create-account-form';
import { GasStationList } from '@components/gas-station-list/gas-station-list';
import { Login } from '@components/login/login';
import { MaintenanceList } from '@components/maintenance/maintenance-list/maintenance-list';
import { GasStationForm } from '@components/gas-station-form/gas-station-form';
import { NotFound } from '@components/not-found/not-found';
import { GasPriceSelector } from '@components/gas-price/gas-price-selector/gas-price-selector.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'cars', component: CarList },
  {
    path: 'maintenances',
    component: MaintenanceList,
  },
  {
    path: 'prices',
    component: GasPriceSelector,
  },
  {
    path: 'gas-stations',
    component: GasStationList,
  },
  {
    path: 'create-account',
    component: CreateAccountForm,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'gas-stations/edit/:id',
    component: GasStationForm,
  },
  {
    path: '**',
    component: NotFound,
  },
];
