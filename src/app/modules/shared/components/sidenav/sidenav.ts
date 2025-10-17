import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../../material-module";
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Home } from '../../../dashboard/components/home/home';

@Component({
  selector: 'app-sidenav',
  imports: [
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MaterialModule,
    MatListModule, 
    CommonModule,
    Home
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav implements OnInit {


  mobileQuery: MediaQueryList;

  menuNav = [
    { name: "Home", route: "home", icon: "home" },
    { name: "Categorias", route: "home", icon: "category" },
    { name: "Productos", route: "home", icon: "production_quantity_limits" },
  ];

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {

  }
}