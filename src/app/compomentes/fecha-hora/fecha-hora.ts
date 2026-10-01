import {
  Component,
  OnDestroy,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { TraspasoDatosService } from '../../servicios/traspaso-datos';


@Component({
  selector: 'app-fecha-hora',

  // Componente Standalone de Angular 22
  standalone: true,

  imports: [
    DecimalPipe
  ],

  templateUrl: './fecha-hora.html',

  styleUrl: './fecha-hora.scss'
})
export class FechaHora implements OnDestroy {

  // ==========================================================
  // SERVICIO
  // ==========================================================
  // Obtenemos la información capturada en el formulario.
  // ==========================================================

  private traspasoService =
    inject(TraspasoDatosService);


  // ==========================================================
  // DATOS
  // ==========================================================

  readonly datos =
    this.traspasoService.datos;


  // ==========================================================
  // CONTADOR
  // ==========================================================
  // Esta propiedad permitirá decidir desde cada tarjeta
  // si queremos mostrar el contador.
  //
  // Tarjeta 1:
  //
  // <app-fecha-hora
  //   [mostrarContador]="false">
  // </app-fecha-hora>
  //
  //
  // Tarjeta 3:
  //
  // <app-fecha-hora
  //   [mostrarContador]="true">
  // </app-fecha-hora>
  // ==========================================================

  readonly mostrarContador =
    input(false);


  // ==========================================================
  // TIEMPO RESTANTE
  // ==========================================================
  // Estos Signals contienen el tiempo que falta para el evento.
  //
  // Se actualizan cada segundo cuando el contador está activo.
  // ==========================================================

  readonly dias = signal(0);

  readonly horas = signal(0);

  readonly minutos = signal(0);

  readonly segundos = signal(0);


  // ==========================================================
  // ID DEL INTERVALO
  // ==========================================================
  // Lo guardamos para poder detenerlo cuando el componente
  // sea destruido.
  // ==========================================================

  private intervaloContador: ReturnType<typeof setInterval> | null = null;


  // ==========================================================
  // FECHA DEL EVENTO
  // ==========================================================
  // Convertimos la fecha recibida desde el formulario a
  // una fecha legible para el usuario.
  //
  // Ejemplo:
  //
  // 2026-12-25
  //
  // se mostrará como:
  //
  // Viernes, 25 de diciembre de 2026
  // ==========================================================

  readonly fechaFormateada = computed(() => {

    const fecha =
      this.datos().fecha;

    if (!fecha) {
      return '';
    }

    // Evitamos problemas de zona horaria usando la fecha
    // como fecha local.
    const partes =
      fecha.split('-');

    if (partes.length !== 3) {
      return fecha;
    }

    const año =
      Number(partes[0]);

    const mes =
      Number(partes[1]) - 1;

    const dia =
      Number(partes[2]);


    const fechaLocal =
      new Date(
        año,
        mes,
        dia
      );


    return new Intl.DateTimeFormat(
      'es-MX',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    ).format(fechaLocal);

  });


  // ==========================================================
  // HORA FORMATEADA
  // ==========================================================
  // Convierte la hora del formulario:
  //
  // 18:30
  //
  // en:
  //
  // 6:30 PM
  // ==========================================================

  readonly horaFormateada = computed(() => {

    const hora =
      this.datos().hora;

    if (!hora) {
      return '';
    }


    const partes =
      hora.split(':');

    if (partes.length < 2) {
      return hora;
    }


    const horas =
      Number(partes[0]);

    const minutos =
      Number(partes[1]);


    const fechaTemporal =
      new Date();

    fechaTemporal.setHours(
      horas,
      minutos,
      0,
      0
    );


    return new Intl.DateTimeFormat(
      'es-MX',
      {
        hour: 'numeric',
        minute: '2-digit'
      }
    ).format(fechaTemporal);

  });


  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  // El contador se inicia cuando el componente existe.
  // ==========================================================

  constructor() {

    this.iniciarContador();

  }


  // ==========================================================
  // INICIAR CONTADOR
  // ==========================================================

  private iniciarContador(): void {

    // --------------------------------------------------------
    // IMPORTANTE PARA SSR
    // --------------------------------------------------------
    //
    // El contador utiliza setInterval.
    //
    // No queremos depender de APIs del navegador durante
    // el renderizado del servidor.
    //
    // Angular ejecutará el componente posteriormente en
    // navegador, donde setInterval estará disponible.
    // --------------------------------------------------------

    if (typeof window === 'undefined') {
      return;
    }


    // --------------------------------------------------------
    // Si la tarjeta no solicita contador, no hacemos nada.
    // --------------------------------------------------------

    if (!this.mostrarContador()) {
      return;
    }


    // Primera actualización inmediata.
    this.actualizarContador();


    // Después actualizamos cada segundo.
    this.intervaloContador =
      setInterval(() => {

        this.actualizarContador();

      }, 1000);

  }


  // ==========================================================
  // ACTUALIZAR CONTADOR
  // ==========================================================

  private actualizarContador(): void {

    const datosActuales =
      this.datos();


    // Si falta fecha u hora no podemos calcular.
    if (
      !datosActuales.fecha ||
      !datosActuales.hora
    ) {

      this.limpiarContador();

      return;
    }


    // --------------------------------------------------------
    // FECHA DESTINO
    // --------------------------------------------------------
    //
    // El formulario almacena:
    //
    // fecha = 2026-12-25
    // hora  = 18:30
    //
    // Creamos:
    //
    // 2026-12-25T18:30:00
    // --------------------------------------------------------

    const fechaEvento =
      new Date(
        `${datosActuales.fecha}T${datosActuales.hora}:00`
      );


    // Si la fecha no es válida detenemos.
    if (
      Number.isNaN(
        fechaEvento.getTime()
      )
    ) {

      this.limpiarContador();

      return;
    }


    const ahora =
      new Date();


    const diferencia =
      fechaEvento.getTime() -
      ahora.getTime();


    // --------------------------------------------------------
    // EVENTO YA PASÓ
    // --------------------------------------------------------

    if (diferencia <= 0) {

      this.dias.set(0);

      this.horas.set(0);

      this.minutos.set(0);

      this.segundos.set(0);

      return;
    }


    // --------------------------------------------------------
    // CONVERSIÓN DEL TIEMPO
    // --------------------------------------------------------

    const segundosTotales =
      Math.floor(
        diferencia / 1000
      );


    const dias =
      Math.floor(
        segundosTotales / 86400
      );


    const horas =
      Math.floor(
        (segundosTotales % 86400) / 3600
      );


    const minutos =
      Math.floor(
        (segundosTotales % 3600) / 60
      );


    const segundos =
      segundosTotales % 60;


    // --------------------------------------------------------
    // ACTUALIZAR SIGNALS
    // --------------------------------------------------------

    this.dias.set(dias);

    this.horas.set(horas);

    this.minutos.set(minutos);

    this.segundos.set(segundos);

  }


  // ==========================================================
  // LIMPIAR CONTADOR
  // ==========================================================

  private limpiarContador(): void {

    this.dias.set(0);

    this.horas.set(0);

    this.minutos.set(0);

    this.segundos.set(0);

  }


  // ==========================================================
  // DESTRUIR COMPONENTE
  // ==========================================================
  // Muy importante:
  //
  // Cuando salimos de la tarjeta debemos detener el
  // setInterval.
  //
  // De lo contrario podríamos dejar procesos ejecutándose
  // innecesariamente.
  // ==========================================================

  ngOnDestroy(): void {

    if (this.intervaloContador !== null) {

      clearInterval(
        this.intervaloContador
      );

      this.intervaloContador = null;

    }

  }

}