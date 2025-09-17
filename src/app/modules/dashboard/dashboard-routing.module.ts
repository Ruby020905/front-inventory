import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: Dashboard,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
 
})
export class DashboardRoutingModule { }