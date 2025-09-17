import { NgModule } from '@angular/core';
import { Home } from './components/home/home';


import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RouterChildModule { }