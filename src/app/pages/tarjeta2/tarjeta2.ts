import { Component, inject, signal } from '@angular/core';

import { TraspasoDatosService } from '../../servicios/traspaso-datos';

import { Entrada } from '../../compomentes/animacion/entrada/entrada';
import { Invitacion } from '../../compomentes/animacion/invitacion/invitacion';
import { Evento } from '../../compomentes/evento/evento';
import { FechaHora } from '../../compomentes/fecha-hora/fecha-hora';
import { Lugar } from '../../compomentes/lugar/lugar';
import { Confirmacion } from '../../compomentes/confirmacion/confirmacion';

@Component({
  selector: 'app-tarjeta2',

  standalone: true,

  imports: [
    Entrada,
    Invitacion,
    Evento,
    FechaHora,
    Lugar,
    Confirmacion
  ],

  templateUrl: './tarjeta2.html',
  styleUrl: './tarjeta2.scss'
})
export class Tarjeta2 {

  // =========================================================
  // SERVICIO CENTRAL DE DATOS
  // =========================================================

  private traspasoService = inject(TraspasoDatosService);

  readonly datos = this.traspasoService.datos;


  // =========================================================
  // CONTROL DE LA ENTRADA
  // =========================================================
  //
  // false = solamente aparece el sobre.
  //
  // true = aparece la tarjeta.
  // =========================================================

  readonly mostrarTarjeta = signal(false);


  // =========================================================
  // MOSTRAR LA TARJETA
  // =========================================================

  mostrarContenido(): void {

    this.mostrarTarjeta.set(true);

  }

}