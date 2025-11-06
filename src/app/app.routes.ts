import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cars',
        loadComponent: () => import('./components/car-list/car-list').then(m => m.CarList)
    }
];
