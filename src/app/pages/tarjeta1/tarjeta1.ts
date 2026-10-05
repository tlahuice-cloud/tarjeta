import { Component, inject, signal } from '@angular/core';

import { TraspasoDatosService } from '../../servicios/traspaso-datos';

import { Entrada } from '../../compomentes/animacion/entrada/entrada';
import { Invitacion } from '../../compomentes/animacion/invitacion/invitacion';
import { Evento } from '../../compomentes/evento/evento';
import { FechaHora } from '../../compomentes/fecha-hora/fecha-hora';
import { Lugar } from '../../compomentes/lugar/lugar';

@Component({
  selector: 'app-tarjeta1',

  standalone: true,

  imports: [
    Entrada,
    Invitacion,
    Evento,
    FechaHora,
    Lugar
  ],

  templateUrl: './tarjeta1.html',
  styleUrl: './tarjeta1.scss'
})
export class Tarjeta1 {

  // ============================================================
  // SERVICIO CENTRAL
  // ============================================================
  // Todos los datos de la invitación vienen del formulario
  // mediante TraspasoDatosService.
  // ============================================================

  private traspasoService = inject(TraspasoDatosService);

  readonly datos = this.traspasoService.datos;


  // ============================================================
  // CONTROL DE LA ENTRADA
  // ============================================================

  /**
   * Indica si ya terminó la apertura del sobre.
   */
  readonly mostrarTarjeta = signal(false);


  /**
   * Controla cuándo comienza la aparición visual
   * del contenido de la invitación.
   */
  readonly mostrarContenidoTarjeta = signal(false);


  // ============================================================
  // EVENTO DEL SOBRE
  // ============================================================

  /**
   * Se ejecuta cuando el componente Entrada
   * termina de abrir el sobre.
   */
  mostrarContenido(): void {

    // Primero mostramos la estructura de la tarjeta.
    this.mostrarTarjeta.set(true);

    /*
     * Esperamos unos milisegundos antes de mostrar
     * completamente el contenido.
     *
     * Esto permite que CSS haga la transición
     * de entrada de forma más elegante.
     */
    setTimeout(() => {

      this.mostrarContenidoTarjeta.set(true);

    }, 150);
  }

}