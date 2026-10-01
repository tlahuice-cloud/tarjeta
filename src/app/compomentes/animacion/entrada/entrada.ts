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

  /**
   * Indica si el usuario ya pulsó el sello.
   *
   * false = sobre cerrado
   * true  = sobre abierto
   */
  readonly sobreAbierto = signal(false);


  /**
   * Indica que el sello fue presionado.
   *
   * Lo utilizamos para controlar la pequeña
   * animación del sello antes de abrir el sobre.
   */
  readonly selloPresionado = signal(false);


  // ==================================================
  // EVENTO PARA EL COMPONENTE PADRE
  // ==================================================

  /**
   * Cuando termina la apertura del sobre,
   * avisamos al componente que contiene
   * <app-entrada>.
   *
   * Más adelante aquí conectaremos Tarjeta 1,
   * Tarjeta 2 o Tarjeta 3.
   */
  readonly sobreAbiertoEvent = output<void>();


  // ==================================================
  // ABRIR SOBRE
  // ==================================================

  abrirSobre(): void {

    // Evitamos que pueda abrirse varias veces.
    if (this.sobreAbierto()) {
      return;
    }

    // Primero presionamos el sello.
    this.selloPresionado.set(true);


    // Pequeña pausa para que se vea
    // la presión del sello.
    setTimeout(() => {

      // Abrimos el sobre.
      this.sobreAbierto.set(true);

    }, 180);


    // Cuando la animación principal termina,
    // avisamos al componente padre.
    setTimeout(() => {

      this.sobreAbiertoEvent.emit();

    }, 1500);
  }
}