import { NgModule } from '@angular/core';
import { Home } from './components/home/home';


import { RouterModule, Routes } from '@angular/router';
import { Category } from '../category/components/category/category';

const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'category', component: Category },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RouterChildModule { }