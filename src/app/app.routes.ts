import { Routes } from '@angular/router';
import { Dashboard } from './modules/dashboard/pages/dashboard'; 
// Asume que necesitas importar tus componentes Home y Category
import { Home } from './modules/dashboard/components/home/home'; 
import { Category } from './modules/category/components/category/category';

export const routes: Routes = [
  // Redirecciona la raíz al dashboard
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

  // RUTA PRINCIPAL DE DASHBOARD
  { 
    path: 'dashboard', 
    component: Dashboard, // El Dashboard Component (que contiene el Sidenav y el <router-outlet>)
    children: [
        // 1. RUTA HIJA POR DEFECTO: Carga Home cuando estás en /dashboard
        { 
            path: 'home', 
            component: Home // El componente que mostraba 'home works!'
        },
        
        // 2. RUTA HIJA DE CATEGORY: Carga Category en /dashboard/category
        { 
            path: 'category', 
            component: Category // El componente que mostrará 'category works!'
        },
        
        // ... Agrega las otras rutas del Sidenav aquí (ej: 'productos')
    ]
  }
];