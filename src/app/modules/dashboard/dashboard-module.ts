import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './pages/dashboard';
import { Home } from './components/home/home';
import { SharedModule } from '../shared/shared-module';
import { Category } from '../category/components/category/category';
import { Product } from '../product/product/product';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    Home,
    Dashboard,
    SharedModule,
    Category,
    Product
  ]
})
export class DashboardModule { }
