import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
    },
    {
        path: 'product',
        loadChildren: () => import('./main/pages/pages.routes').then(m => m.PAGES_ROUTES)
    }
];
