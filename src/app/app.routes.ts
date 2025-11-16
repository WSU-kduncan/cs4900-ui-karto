import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cars',
        loadComponent: () => import('./components/car-list/car-list').then(m => m.CarList)
    },
    {
        path: 'maintenances',
        loadComponent: () => import('./components/maintenance/maintenance-list/maintenance-list').then(m => m.MaintenanceList)
    }
];
