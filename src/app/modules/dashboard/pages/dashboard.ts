import { Component } from '@angular/core';
import { Sidenav } from '../../shared/components/sidenav/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidenav],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
