import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { Confirm } from './components/confirm/confirm';



@NgModule({
  declarations: [
  ],
  exports: [

    ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    MatInputModule,
    Confirm
   ]
})
export class SharedModule { }
