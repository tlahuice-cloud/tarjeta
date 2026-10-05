import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  TraspasoDatosService
} from '../../servicios/traspaso-datos';

import {
  Botonera,
  SeccionTarjeta3
} from '../../compomentes/botonera/botonera';

import {
  Entrada
} from '../../compomentes/animacion/entrada/entrada';

import {
  Invitacion
} from '../../compomentes/animacion/invitacion/invitacion';

import {
  Evento
} from '../../compomentes/evento/evento';

import {
  FechaHora
} from '../../compomentes/fecha-hora/fecha-hora';

import {
  Lugar
} from '../../compomentes/lugar/lugar';

import {
  Confirmacion
} from '../../compomentes/confirmacion/confirmacion';


@Component({
  selector: 'app-tarjeta3',

  standalone: true,

  imports: [
    Entrada,
    Botonera,
    Invitacion,
    Evento,
    FechaHora,
    Lugar,
    Confirmacion
  ],

  templateUrl: './tarjeta3.html',
  styleUrl: './tarjeta3.scss'
})
export class Tarjeta3 {

  // =========================================================
  // SERVICIO CENTRAL DE DATOS
  // =========================================================

  private traspasoService =
    inject(TraspasoDatosService);

  readonly datos =
    this.traspasoService.datos;


  // =========================================================
  // CONTROL DEL SOBRE
  // =========================================================

  readonly mostrarTarjeta =
    signal(false);


  // =========================================================
  // SECCIÓN ACTUAL
  // =========================================================

  readonly seccionActual =
    signal<SeccionTarjeta3>('inicio');


  // =========================================================
  // MOSTRAR TARJETA DESPUÉS DEL SOBRE
  // =========================================================

  mostrarContenido(): void {

    this.mostrarTarjeta.set(true);

  }


  // =========================================================
  // CAMBIAR SECCIÓN
  // =========================================================

  cambiarSeccion(
    seccion: SeccionTarjeta3
  ): void {

    this.seccionActual.set(seccion);

    // Regresamos al inicio de la pantalla
    // cuando cambia la sección.

    if (typeof window !== 'undefined') {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

  }

}