import { Routes } from '@angular/router';
import { Dashboard } from './modules/dashboard/pages/dashboard'; 
// Asume que necesitas importar tus componentes Home y Category
import { Home } from './modules/dashboard/components/home/home'; 
import { Category } from './modules/category/components/category/category';
import { Product } from './modules/product/product/product';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/home' },

  { 
    path: 'dashboard', 
    component: Dashboard,
    // canActivate: [canActivateAuthRole], // Esto asegura que el token exista antes de cargar el Sidenav
    children: [
        { path: 'home', component: Home },
        { path: 'category', component: Category },
        { path: 'product', component: Product },
        { path: '', redirectTo: 'home', pathMatch: 'full' } // Redirección interna
    ]
  }
];