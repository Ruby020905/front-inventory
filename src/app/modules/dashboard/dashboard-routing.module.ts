import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard';
import { SharedModule } from '../shared/shared-module';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: Dashboard,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes),SharedModule],
    exports: [RouterModule],
 
})
export class DashboardRoutingModule { }