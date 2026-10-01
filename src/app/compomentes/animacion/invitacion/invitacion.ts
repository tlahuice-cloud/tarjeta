import {
  Component,
  computed,
  inject
} from '@angular/core';

import {
  TraspasoDatosService,
  TipoEvento
} from '../../../servicios/traspaso-datos';


@Component({
  selector: 'app-invitacion',

  standalone: true,

  imports: [],

  templateUrl: './invitacion.html',

  styleUrl: './invitacion.scss'
})
export class Invitacion {

  // ==================================================
  // SERVICIO
  // ==================================================

  private traspasoService = inject(
    TraspasoDatosService
  );


  // ==================================================
  // DATOS DE LA INVITACIÓN
  // ==================================================

  readonly datos = this.traspasoService.datos;


  // ==================================================
  // TIPO DE EVENTO
  // ==================================================

  readonly tipoEvento = computed(
    () => this.datos().tipoEvento
  );


  // ==================================================
  // NOMBRE DEL EVENTO
  // ==================================================

  readonly nombreEvento = computed(() =>
    this.obtenerNombreEvento(
      this.tipoEvento()
    )
  );


  // ==================================================
  // ICONOS / ELEMENTOS DECORATIVOS
  // ==================================================

  readonly iconosEvento = computed(() =>
    this.obtenerIconosEvento(
      this.tipoEvento()
    )
  );


  // ==================================================
  // NOMBRE
  // ==================================================

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


  // ==================================================
  // ICONOS DEL EVENTO
  // ==================================================

  private obtenerIconosEvento(
    tipo: TipoEvento
  ): string[] {

    switch (tipo) {

      case 'boda':
        return ['💍', '💍'];

      case 'xv_anos':
        return ['👑'];

      case 'cumpleanos':
        return ['🎂'];

      case 'bautizo':
        return ['🕊️'];

      case 'primera_comunion':
        return ['✝️'];

      case 'confirmacion':
        return ['🕊️'];

      case 'graduacion':
        return ['🎓'];

      case 'aniversario':
        return ['💕'];

      case 'baby_shower':
        return ['🍼'];

      case 'revelacion_genero':
        return ['💙', '💗'];

      case 'despedida':
        return ['🌸'];

      case 'presentacion':
        return ['🎉'];

      case 'otro':
        return ['✨'];

      default:
        return ['✨'];
    }
  }
}