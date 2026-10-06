
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

  /**
   * false = solamente aparece el sobre.
   *
   * true = aparece la Tarjeta 3.
   */

  readonly mostrarTarjeta =
    signal(false);



  // =========================================================
  // SECCIÓN ACTUAL
  // =========================================================

  /**
   * Sección que se encuentra visible.
   *
   * inicio
   * detalles
   * galeria
   */

  readonly seccionActual =
    signal<SeccionTarjeta3>('inicio');



  // =========================================================
  // GALERÍA
  // =========================================================

  /**
   * Índice de la fotografía actual.
   *
   * Ejemplo:
   *
   * 0 = fotografía 1
   * 1 = fotografía 2
   * 2 = fotografía 3
   */

  readonly fotoActual =
    signal(0);



  /**
   * Número total de fotografías.
   */

  get totalFotos(): number {

    return (
      this.datos().galeriaFotos?.length ?? 0
    );

  }



  // =========================================================
  // SWIPE GENERAL
  // =========================================================

  private touchStartX = 0;

  private touchStartY = 0;



  /**
   * Distancia mínima para considerar
   * que realmente hubo un swipe.
   */

  private readonly distanciaSwipe = 60;



  // =========================================================
  // SWIPE DE GALERÍA
  // =========================================================

  private galeriaTouchStartX = 0;

  private galeriaTouchStartY = 0;



  // =========================================================
  // MOSTRAR CONTENIDO
  // =========================================================

  /**
   * Se ejecuta cuando el usuario abre
   * el sobre de entrada.
   */

  mostrarContenido(): void {

    this.mostrarTarjeta.set(true);

    this.seccionActual.set('inicio');

    this.fotoActual.set(0);

  }



  // =========================================================
  // CAMBIAR SECCIÓN
  // =========================================================

  cambiarSeccion(
    seccion: SeccionTarjeta3
  ): void {


    // -------------------------------------------------------
    // Si ya estamos en esa sección no hacemos nada.
    // -------------------------------------------------------

    if (
      this.seccionActual() === seccion
    ) {

      return;

    }



    // -------------------------------------------------------
    // Cambiamos la sección.
    // -------------------------------------------------------

    this.seccionActual.set(
      seccion
    );



    // -------------------------------------------------------
    // Cuando entramos a Galería,
    // comenzamos desde la primera fotografía.
    // -------------------------------------------------------

    if (
      seccion === 'galeria'
    ) {

      this.fotoActual.set(0);

    }



    // -------------------------------------------------------
    // Regresamos al inicio.
    // -------------------------------------------------------

    this.irArriba();

  }



  // =========================================================
  // SWIPE GENERAL
  // =========================================================

  iniciarSwipe(
    event: TouchEvent
  ): void {


    const touch =
      event.changedTouches[0];


    if (!touch) {

      return;

    }



    this.touchStartX =
      touch.clientX;


    this.touchStartY =
      touch.clientY;

  }



  // =========================================================
  // TERMINAR SWIPE GENERAL
  // =========================================================

  terminarSwipe(
    event: TouchEvent
  ): void {


    const touch =
      event.changedTouches[0];


    if (!touch) {

      return;

    }



    const diferenciaX =
      touch.clientX -
      this.touchStartX;


    const diferenciaY =
      touch.clientY -
      this.touchStartY;



    // -------------------------------------------------------
    // Si el movimiento es principalmente vertical,
    // no cambiamos de sección.
    // -------------------------------------------------------

    if (
      Math.abs(diferenciaY) >
      Math.abs(diferenciaX)
    ) {

      return;

    }



    // -------------------------------------------------------
    // El movimiento fue demasiado pequeño.
    // -------------------------------------------------------

    if (
      Math.abs(diferenciaX) <
      this.distanciaSwipe
    ) {

      return;

    }



    // -------------------------------------------------------
    // GALERÍA
    //
    // En Galería el swipe pertenece exclusivamente
    // al carrusel de fotografías.
    // -------------------------------------------------------

    if (
      this.seccionActual() === 'galeria'
    ) {

      return;

    }



    // -------------------------------------------------------
    // Swipe hacia la izquierda.
    // -------------------------------------------------------

    if (
      diferenciaX < 0
    ) {

      this.seccionSiguiente();

      return;

    }



    // -------------------------------------------------------
    // Swipe hacia la derecha.
    // -------------------------------------------------------

    this.seccionAnterior();

  }



  // =========================================================
  // SIGUIENTE SECCIÓN
  // =========================================================

  private seccionSiguiente(): void {


    const actual =
      this.seccionActual();



    // -------------------------------------------------------
    // INICIO → DETALLES
    // -------------------------------------------------------

    if (
      actual === 'inicio'
    ) {

      this.cambiarSeccion(
        'detalles'
      );

      return;

    }



    // -------------------------------------------------------
    // DETALLES → GALERÍA
    // -------------------------------------------------------

    if (
      actual === 'detalles'
    ) {

      this.cambiarSeccion(
        'galeria'
      );

      return;

    }



    // -------------------------------------------------------
    // GALERÍA → INICIO
    // -------------------------------------------------------

    this.cambiarSeccion(
      'inicio'
    );

  }



  // =========================================================
  // SECCIÓN ANTERIOR
  // =========================================================

  private seccionAnterior(): void {


    const actual =
      this.seccionActual();



    // -------------------------------------------------------
    // GALERÍA → DETALLES
    // -------------------------------------------------------

    if (
      actual === 'galeria'
    ) {

      this.cambiarSeccion(
        'detalles'
      );

      return;

    }



    // -------------------------------------------------------
    // DETALLES → INICIO
    // -------------------------------------------------------

    if (
      actual === 'detalles'
    ) {

      this.cambiarSeccion(
        'inicio'
      );

      return;

    }



    // -------------------------------------------------------
    // INICIO → GALERÍA
    // -------------------------------------------------------

    this.cambiarSeccion(
      'galeria'
    );

  }



  // =========================================================
  // INICIAR SWIPE DE GALERÍA
  // =========================================================

  iniciarSwipeGaleria(
    event: TouchEvent
  ): void {


    // -------------------------------------------------------
    // Evitamos que el evento llegue al <main>.
    // -------------------------------------------------------

    event.stopPropagation();



    const touch =
      event.changedTouches[0];


    if (!touch) {

      return;

    }



    this.galeriaTouchStartX =
      touch.clientX;


    this.galeriaTouchStartY =
      touch.clientY;

  }



  // =========================================================
  // TERMINAR SWIPE DE GALERÍA
  // =========================================================

  terminarSwipeGaleria(
    event: TouchEvent
  ): void {


    // -------------------------------------------------------
    // Evitamos que el evento llegue al <main>.
    // -------------------------------------------------------

    event.stopPropagation();



    const touch =
      event.changedTouches[0];


    if (!touch) {

      return;

    }



    const diferenciaX =
      touch.clientX -
      this.galeriaTouchStartX;


    const diferenciaY =
      touch.clientY -
      this.galeriaTouchStartY;



    // -------------------------------------------------------
    // Si fue desplazamiento vertical,
    // no cambiamos fotografía.
    // -------------------------------------------------------

    if (
      Math.abs(diferenciaY) >
      Math.abs(diferenciaX)
    ) {

      return;

    }



    // -------------------------------------------------------
    // Swipe demasiado pequeño.
    // -------------------------------------------------------

    if (
      Math.abs(diferenciaX) <
      this.distanciaSwipe
    ) {

      return;

    }



    // -------------------------------------------------------
    // IZQUIERDA
    //
    // Siguiente fotografía.
    // -------------------------------------------------------

    if (
      diferenciaX < 0
    ) {

      this.siguienteFoto();

      return;

    }



    // -------------------------------------------------------
    // DERECHA
    //
    // Fotografía anterior.
    // -------------------------------------------------------

    this.fotoAnterior();

  }



  // =========================================================
  // SIGUIENTE FOTOGRAFÍA
  // =========================================================

  siguienteFoto(): void {


    const total =
      this.totalFotos;



    // -------------------------------------------------------
    // No hay fotografías.
    // -------------------------------------------------------

    if (
      total === 0
    ) {

      return;

    }



    const actual =
      this.fotoActual();



    // -------------------------------------------------------
    // Última → Primera.
    //
    // Navegación circular.
    // -------------------------------------------------------

    if (
      actual >= total - 1
    ) {

      this.fotoActual.set(0);

      return;

    }



    // -------------------------------------------------------
    // Avanzamos una fotografía.
    // -------------------------------------------------------

    this.fotoActual.set(
      actual + 1
    );

  }



  // =========================================================
  // FOTOGRAFÍA ANTERIOR
  // =========================================================

  fotoAnterior(): void {


    const total =
      this.totalFotos;



    // -------------------------------------------------------
    // No hay fotografías.
    // -------------------------------------------------------

    if (
      total === 0
    ) {

      return;

    }



    const actual =
      this.fotoActual();



    // -------------------------------------------------------
    // Primera → Última.
    //
    // Navegación circular.
    // -------------------------------------------------------

    if (
      actual <= 0
    ) {

      this.fotoActual.set(
        total - 1
      );

      return;

    }



    // -------------------------------------------------------
    // Retrocedemos una fotografía.
    // -------------------------------------------------------

    this.fotoActual.set(
      actual - 1
    );

  }



  // =========================================================
  // SELECCIONAR FOTOGRAFÍA
  // =========================================================

  seleccionarFoto(
    indice: number
  ): void {


    const total =
      this.totalFotos;



    // -------------------------------------------------------
    // Validación.
    // -------------------------------------------------------

    if (
      indice < 0 ||
      indice >= total
    ) {

      return;

    }



    // -------------------------------------------------------
    // Seleccionamos la fotografía.
    // -------------------------------------------------------

    this.fotoActual.set(
      indice
    );

  }



  // =========================================================
  // URL DE LA FOTOGRAFÍA ACTUAL
  // =========================================================

  get fotoActualUrl(): string {


    const fotos =
      this.datos().galeriaFotos;



    // -------------------------------------------------------
    // No existen fotografías.
    // -------------------------------------------------------

    if (
      !fotos ||
      fotos.length === 0
    ) {

      return '';

    }



    // -------------------------------------------------------
    // Devolvemos la fotografía actual.
    // -------------------------------------------------------

    return (
      fotos[this.fotoActual()] ?? ''
    );

  }



  // =========================================================
  // NÚMERO DE FOTOGRAFÍA
  // =========================================================

  get numeroFotoActual(): number {


    if (
      this.totalFotos === 0
    ) {

      return 0;

    }



    // El usuario ve 1, 2, 3...
    // mientras internamente usamos 0, 1, 2...

    return (
      this.fotoActual() + 1
    );

  }



  // =========================================================
  // VOLVER ARRIBA
  // =========================================================

  private irArriba(): void {


    if (
      typeof window === 'undefined'
    ) {

      return;

    }



    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }

}
