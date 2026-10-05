import {
  Component,
  output,
  signal
} from '@angular/core';


// ==================================================
// SECCIONES DE LA TARJETA 3
// ==================================================

export type SeccionTarjeta3 =
  | 'inicio'
  | 'detalles'
  | 'galeria';


// ==================================================
// COMPONENTE
// ==================================================

@Component({
  selector: 'app-botonera',

  standalone: true,

  imports: [],

  templateUrl: './botonera.html',

  styleUrl: './botonera.scss'
})
export class Botonera {

  // ==================================================
  // SECCIÓN ACTUAL
  // ==================================================

  /**
   * Por defecto comenzamos en Inicio.
   */
  readonly seccionActual =
    signal<SeccionTarjeta3>('inicio');


  // ==================================================
  // EVENTO PARA TARJETA 3
  // ==================================================

  /**
   * Avisamos a Tarjeta 3 cuando el usuario
   * selecciona otra pantalla.
   */
  readonly cambiarSeccion =
    output<SeccionTarjeta3>();


  // ==================================================
  // CAMBIAR DE SECCIÓN
  // ==================================================

  seleccionarSeccion(
    seccion: SeccionTarjeta3
  ): void {

    // Guardamos la sección actual.
    this.seccionActual.set(seccion);

    // Avisamos al componente padre.
    this.cambiarSeccion.emit(seccion);
  }
}