import { Component, inject } from '@angular/core';
import { Sidenav } from '../../shared/components/sidenav/sidenav';
import { RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidenav],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private keycloakService = inject(KeycloakService);


}
