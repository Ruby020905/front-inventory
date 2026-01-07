import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../../material-module";
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Home } from '../../../dashboard/components/home/home';
import { KeycloakService } from 'keycloak-angular';

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
    CommonModule
],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav implements OnInit {
private keycloakService = inject(KeycloakService);
private cd = inject(ChangeDetectorRef);

  username: string = 'Cargando...';

  mobileQuery: MediaQueryList;

  menuNav = [
    { name: "Home", route: "home", icon: "home" },
    { name: "Tipo de Medicamentos", route: "category", icon: "category" },
    { name: "Productos", route: "product", icon: "production_quantity_limits" },
  ];

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }


  async ngOnInit() {
  console.log('isLoggedIn:', await this.keycloakService.isLoggedIn());
  console.log('token:', await this.keycloakService.getToken());

  await this.cargarUsuario();
}


 async cargarUsuario() {
  try {
    const token = await this.keycloakService.getToken();

    if (!token) {
      this.username = 'Invitado';
      return;
    }

    const profile = await this.keycloakService.loadUserProfile();

    this.username =
      profile.firstName ||
      profile.username ||
      'Usuario';

  } catch (error) {
    console.error('Error cargando usuario:', error);
    this.username = 'Invitado';
  }
}



///cerrar sesión
async logout() {
  try {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    
    if (isLoggedIn) {
      // Intento normal
      await this.keycloakService.logout(window.location.origin);
    } else {
      console.log("Forzando salida manual...");
      // Salida manual si la librería no detecta la sesión
      const logoutUrl = `http://localhost:8082/realms/inventory/protocol/openid-connect/logout?client_id=angular-client&post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
      window.location.href = logoutUrl;
    }
  } catch (error) {
    console.error("Error en logout:", error);
  }
}

}