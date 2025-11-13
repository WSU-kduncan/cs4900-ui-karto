import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cars',
        loadComponent: () => import('./components/car/car-list/car-list').then(m => m.CarList)
    },
    {
        path: 'maintenances',
        loadComponent: () => import('./components/maintenance-list/maintenance-list').then(m => m.MaintenanceList)
    }
];
