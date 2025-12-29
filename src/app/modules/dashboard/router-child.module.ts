import { NgModule } from '@angular/core';
import { Home } from './components/home/home';


import { RouterModule, Routes } from '@angular/router';
import { Category } from '../category/components/category/category';
import { Product } from '../product/product/product';

const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'category', component: Category },
    { path: 'product', component: Product },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RouterChildModule { }