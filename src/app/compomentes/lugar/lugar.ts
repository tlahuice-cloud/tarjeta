import {
  Component,
  computed,
  inject
} from '@angular/core';

import {
  TraspasoDatosService
} from '../../servicios/traspaso-datos';


@Component({
  selector: 'app-lugar',

  // Componente independiente de Angular 22
  standalone: true,

  templateUrl: './lugar.html',

  styleUrl: './lugar.scss'
})
export class Lugar {

  // ==========================================================
  // SERVICIO
  // ==========================================================
  // Obtenemos los datos capturados desde el formulario.
  // ==========================================================

  private traspasoService = inject(
    TraspasoDatosService
  );


  // ==========================================================
  // DATOS
  // ==========================================================
  // Signal de solo lectura.
  //
  // El componente se actualizará automáticamente cuando cambien
  // los datos dentro de TraspasoDatosService.
  // ==========================================================

  readonly datos =
    this.traspasoService.datos;


  // ==========================================================
  // NOMBRE DEL LUGAR
  // ==========================================================
  // Obtiene solamente el nombre del salón, jardín, iglesia,
  // restaurante, etc.
  // ==========================================================

  readonly nombreLugar = computed(() => {

    return this.datos().nombreLugar?.trim() ?? '';

  });


  // ==========================================================
  // DIRECCIÓN
  // ==========================================================
  // Obtiene la dirección capturada en el formulario.
  // ==========================================================

  readonly direccion = computed(() => {

    return this.datos().direccion?.trim() ?? '';

  });


  // ==========================================================
  // LINK DE GOOGLE MAPS
  // ==========================================================
  // Obtiene el enlace de Google Maps.
  // ==========================================================

  readonly linkMaps = computed(() => {

    return this.datos()
      .linkUbicacionMaps
      ?.trim() ?? '';

  });


  // ==========================================================
  // ¿TIENE LUGAR?
  // ==========================================================
  // Nos permite determinar si existe información de ubicación.
  //
  // Si no existe ni nombre ni dirección, podemos evitar mostrar
  // información vacía.
  // ==========================================================

  readonly tieneLugar = computed(() => {

    return (
      this.nombreLugar() !== '' ||
      this.direccion() !== ''
    );

  });


  // ==========================================================
  // ¿TIENE GOOGLE MAPS?
  // ==========================================================
  // Esta propiedad es utilizada directamente por lugar.html.
  //
  // Si existe un enlace:
  //
  // tieneMaps() === true
  //
  // Si no existe:
  //
  // tieneMaps() === false
  // ==========================================================

  readonly tieneMaps = computed(() => {

    return this.linkMaps() !== '';

  });


  // ==========================================================
  // ABRIR GOOGLE MAPS
  // ==========================================================
  // Se ejecuta únicamente cuando el usuario pulsa el botón.
  //
  // Esto es compatible con SSR porque window solamente se
  // utiliza después de una acción del usuario en el navegador.
  // ==========================================================

  abrirMaps(): void {

    const url =
      this.linkMaps();


    // Si no existe URL, no hacemos nada.
    if (!url) {

      return;

    }


    // --------------------------------------------------------
    // VALIDACIÓN BÁSICA
    // --------------------------------------------------------
    // Solamente permitimos enlaces HTTP y HTTPS.
    // --------------------------------------------------------

    if (
      !url.startsWith('https://') &&
      !url.startsWith('http://')
    ) {

      return;

    }


    // --------------------------------------------------------
    // ABRIR EN UNA NUEVA PESTAÑA
    // --------------------------------------------------------

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );

  }

}