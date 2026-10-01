import { Component, computed, inject } from '@angular/core';
import { TraspasoDatosService } from '../../servicios/traspaso-datos';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.scss'
})
export class Confirmacion {

  // --------------------------------------------------
  // SERVICIO CON LOS DATOS DE LA INVITACIÓN
  // --------------------------------------------------

  private traspasoService = inject(TraspasoDatosService);

  readonly datos = this.traspasoService.datos;


  // --------------------------------------------------
  // DATOS QUE UTILIZAREMOS EN LA CONFIRMACIÓN
  // --------------------------------------------------

  readonly numeroWhatsApp = computed(() =>
    this.datos().numeroWhatsAppConfirmacion?.trim() ?? ''
  );

  readonly nombreEvento = computed(() =>
    this.datos().nombreFestejado?.trim() ?? ''
  );


  // --------------------------------------------------
  // COMPROBAR SI EXISTE UN NÚMERO DE WHATSAPP
  // --------------------------------------------------

  readonly tieneWhatsApp = computed(() =>
    this.numeroWhatsApp() !== ''
  );


  // --------------------------------------------------
  // MENSAJE QUE SE ENVIARÁ POR WHATSAPP
  // --------------------------------------------------

  readonly mensajeWhatsApp = computed(() => {

    const nombre = this.nombreEvento();

    if (nombre !== '') {
      return `Hola, quiero confirmar mi asistencia al evento de ${nombre}.`;
    }

    return 'Hola, quiero confirmar mi asistencia al evento.';
  });


  // --------------------------------------------------
  // ABRIR WHATSAPP
  // --------------------------------------------------

  confirmarPorWhatsApp(): void {

    const numero = this.numeroWhatsApp();

    if (!numero) {
      return;
    }

    const mensaje = encodeURIComponent(
      this.mensajeWhatsApp()
    );

    const url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }
}