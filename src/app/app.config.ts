import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideKeycloak } from 'keycloak-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Detección de cambios estándar (Obligatorio para Keycloak)
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    provideRouter(routes),
    provideHttpClient(),
    
    provideKeycloak({
      config: {
        url: 'http://localhost:8082', 
        realm: 'inventory',
        clientId: 'angular-client'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        flow: "standard"
        // He quitado silentCheckSsoRedirectUri para asegurar que primero cargue el login
      }
    })
  ]
};