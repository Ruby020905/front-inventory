import { Routes } from '@angular/router';
import { Dashboard } from './modules/dashboard/pages/dashboard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    { path: 'dashboard', component: Dashboard}

  
];