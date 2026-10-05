import {
  Component,
  output,
  signal
} from '@angular/core';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [],
  templateUrl: './entrada.html',
  styleUrl: './entrada.scss'
})
export class Entrada {

  // ==================================================
  // ESTADO DEL SOBRE
  // ==================================================

  readonly sobreAbierto = signal(false);
  readonly selloPresionado = signal(false);

  // ==================================================
  // EVENTO PARA EL COMPONENTE PADRE
  // ==================================================

  readonly sobreAbiertoEvent = output<void>();

  // ==================================================
  // ABRIR SOBRE
  // ==================================================

  abrirSobre(): void {

    if (this.sobreAbierto()) {
      return;
    }

    // 1. Presión del sello
    this.selloPresionado.set(true);

    // 2. Apertura del sobre y salida de la hoja
    setTimeout(() => {
      this.sobreAbierto.set(true);
    }, 180);

    // 3. Emitir evento cuando el resplandor alcanza su brillo máximo (2.5s)
    setTimeout(() => {
      this.sobreAbiertoEvent.emit();
    }, 2500);
  }
}