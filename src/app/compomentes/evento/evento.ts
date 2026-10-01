import {
  Component,
  computed,
  inject
} from '@angular/core';

import {
  TraspasoDatosService,
  TipoEvento
} from '../../servicios/traspaso-datos';


@Component({
  selector: 'app-evento',

  // Componente independiente de Angular 22
  standalone: true,

  templateUrl: './evento.html',

  styleUrl: './evento.scss'
})
export class Evento {

  // ==========================================================
  // SERVICIO DE TRASPASO DE DATOS
  // ==========================================================
  // Aquí obtenemos la información que capturamos anteriormente
  // en el formulario.
  //
  // Formulario
  //     ↓
  // TraspasoDatosService
  //     ↓
  // Evento
  // ==========================================================

  private traspasoService = inject(
    TraspasoDatosService
  );


  // ==========================================================
  // DATOS
  // ==========================================================
  // El servicio nos proporciona un Signal de solo lectura.
  //
  // IMPORTANTE:
  // "datos" es un Signal, por eso en el HTML se utiliza:
  //
  // datos()
  //
  // ==========================================================

  readonly datos =
    this.traspasoService.datos;


  // ==========================================================
  // NOMBRES DEL EVENTO
  // ==========================================================
  // Aquí determinamos si necesitamos uno o dos nombres.
  //
  // Boda:
  //
  // nombreFestejado = Ana
  // nombrePareja   = Carlos
  //
  // Resultado:
  //
  // ['Ana', 'Carlos']
  //
  //
  // Cumpleaños:
  //
  // nombreFestejado = Santiago
  // nombrePareja   = ''
  //
  // Resultado:
  //
  // ['Santiago']
  // ==========================================================

  readonly nombresEvento = computed(() => {

    const datosActuales = this.datos();


    // Si existe segundo nombre
    if (
      datosActuales.nombrePareja &&
      datosActuales.nombrePareja.trim() !== ''
    ) {

      return [
        datosActuales.nombreFestejado,
        datosActuales.nombrePareja
      ];

    }


    // Si solamente existe un nombre
    return [
      datosActuales.nombreFestejado
    ];

  });


  // ==========================================================
  // NOMBRE DEL TIPO DE EVENTO
  // ==========================================================
  // Convierte el valor interno del servicio:
  //
  // "xv_anos"
  //
  // en:
  //
  // "XV Años"
  // ==========================================================

  readonly nombreTipoEvento = computed(() => {

    return this.obtenerNombreEvento(
      this.datos().tipoEvento
    );

  });


  // ==========================================================
  // ICONO DEL EVENTO
  // ==========================================================
  // Cada evento tendrá un icono diferente.
  // Más adelante podremos sustituirlos por SVG o iconos
  // profesionales.
  // ==========================================================

  readonly iconoEvento = computed(() => {

    return this.obtenerIconoEvento(
      this.datos().tipoEvento
    );

  });


  // ==========================================================
  // OBTENER NOMBRE DEL EVENTO
  // ==========================================================

  private obtenerNombreEvento(
    tipo: TipoEvento
  ): string {

    switch (tipo) {

      case 'boda':
        return 'Boda';

      case 'xv_anos':
        return 'XV Años';

      case 'cumpleanos':
        return 'Cumpleaños';

      case 'bautizo':
        return 'Bautizo';

      case 'primera_comunion':
        return 'Primera Comunión';

      case 'confirmacion':
        return 'Confirmación';

      case 'graduacion':
        return 'Graduación';

      case 'aniversario':
        return 'Aniversario';

      case 'baby_shower':
        return 'Baby Shower';

      case 'revelacion_genero':
        return 'Revelación de Género';

      case 'despedida':
        return 'Despedida';

      case 'presentacion':
        return 'Presentación';

      case 'otro':
        return 'Evento Especial';

      default:
        return 'Evento Especial';

    }

  }


  // ==========================================================
  // OBTENER ICONO
  // ==========================================================

  private obtenerIconoEvento(
    tipo: TipoEvento
  ): string {

    switch (tipo) {

      case 'boda':
        return '💍';

      case 'xv_anos':
        return '👑';

      case 'cumpleanos':
        return '🎂';

      case 'bautizo':
        return '👶';

      case 'primera_comunion':
        return '⛪';

      case 'confirmacion':
        return '✝️';

      case 'graduacion':
        return '🎓';

      case 'aniversario':
        return '💕';

      case 'baby_shower':
        return '🍼';

      case 'revelacion_genero':
        return '💙💗';

      case 'despedida':
        return '💐';

      case 'presentacion':
        return '🎉';

      case 'otro':
        return '✨';

      default:
        return '✨';

    }

  }

}