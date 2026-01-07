import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('front-inventory');

  private observer: MutationObserver | undefined;

  ngOnInit() {
    // 2. Configuramos el observador
    this.observer = new MutationObserver((mutations) => {
      console.log('Cambios detectados en el DOM');
    });

    // Verificamos que document.body existe antes de observar
    if (document.body) {
      this.observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  // 3. ESTA ES LA SOLUCIÓN AL ERROR AL CERRAR
  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      console.log('Observador desconectado con éxito');
    }
  }
}