import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  TraspasoDatosService,
  TipoEvento
} from '../../servicios/traspaso-datos';


@Component({
  selector: 'app-formulario',

  // Angular Standalone Component
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})
export class FormularioComponent {

  // =========================================================
  // INYECCIÓN DE DEPENDENCIAS
  // =========================================================

  private fb = inject(FormBuilder);

  private traspasoService = inject(TraspasoDatosService);

  private router = inject(Router);


  // =========================================================
  // EVENTO SELECCIONADO
  // =========================================================
  // Signal de Angular.
  //
  // Nos permite cambiar el HTML inmediatamente cuando
  // el usuario selecciona otro tipo de evento.
  // =========================================================

  tipoEventoSeleccionado = signal<TipoEvento>('boda');


  // =========================================================
  // FORMULARIO PRINCIPAL
  // =========================================================

  formularioTarjeta: FormGroup = this.fb.group({

    // Tipo de evento
    tipoEvento: [
      'boda',
      Validators.required
    ],

    // Nombre principal
    nombreFestejado: [
      '',
      Validators.required
    ],

    // Segundo nombre.
    // Se utiliza principalmente para boda y aniversario.
    nombrePareja: [
      '',
      Validators.required
    ],

    // Padres
    papas: [''],

    // Padrinos
    padrinos: [''],

    // Fecha
    fecha: [
      '',
      Validators.required
    ],

    // Hora
    hora: [
      '',
      Validators.required
    ],

    // Lugar
    nombreLugar: [
      '',
      Validators.required
    ],

    // Dirección
    direccion: [
      '',
      Validators.required
    ],

    // Google Maps
    linkUbicacionMaps: [''],

    // Mensaje mostrado dentro de la invitación
    mensajeBienvenida: [
      '¡Nos casamos y queremos que seas parte!'
    ],

    // Código de vestimenta
    codigoVestimenta: [
      'Formal'
    ],

    // WhatsApp para confirmar asistencia.
    //
    // No ponemos Validators.required aquí porque no todos
    // los eventos utilizarán confirmación.
    numeroWhatsAppConfirmacion: [
      '',
      Validators.pattern('^[0-9]{10,15}$')
    ]

  });


  // =========================================================
  // CAMBIO DE TIPO DE EVENTO
  // =========================================================

  alCambiarTipoEvento(event: Event): void {

    const select = event.target as HTMLSelectElement;

    const tipo = select.value as TipoEvento;

    // Actualizamos el signal.
    // Esto provoca que Angular actualice los @if y @switch
    // del HTML.
    this.tipoEventoSeleccionado.set(tipo);

    // Configuramos los campos dependiendo del evento.
    this.configurarCamposPorEvento(tipo);

    // Cambiamos el mensaje sugerido.
    this.actualizarMensajeEvento(tipo);
  }


  // =========================================================
  // CONFIGURAR CAMPOS SEGÚN EL EVENTO
  // =========================================================

  private configurarCamposPorEvento(tipo: TipoEvento): void {

    const nombrePareja =
      this.formularioTarjeta.get('nombrePareja');

    const papas =
      this.formularioTarjeta.get('papas');

    const padrinos =
      this.formularioTarjeta.get('padrinos');

    const codigoVestimenta =
      this.formularioTarjeta.get('codigoVestimenta');

    const whatsapp =
      this.formularioTarjeta.get('numeroWhatsAppConfirmacion');


    // ---------------------------------------------------------
    // SEGUNDO NOMBRE / PAREJA
    // ---------------------------------------------------------
    // Solamente lo necesitamos obligatoriamente en:
    //
    // Boda
    // Aniversario
    // ---------------------------------------------------------

    if (
      tipo === 'boda' ||
      tipo === 'aniversario'
    ) {

      nombrePareja?.setValidators([
        Validators.required
      ]);

    } else {

      nombrePareja?.clearValidators();

      // Limpiamos datos del evento anterior.
      nombrePareja?.setValue('');
    }


    // ---------------------------------------------------------
    // PADRES
    // ---------------------------------------------------------

    const eventosConPadres: TipoEvento[] = [
      'boda',
      'xv_anos',
      'bautizo',
      'primera_comunion',
      'confirmacion'
    ];

    if (!eventosConPadres.includes(tipo)) {

      papas?.setValue('');

    }


    // ---------------------------------------------------------
    // PADRINOS
    // ---------------------------------------------------------

    const eventosConPadrinos: TipoEvento[] = [
      'xv_anos',
      'bautizo',
      'primera_comunion',
      'confirmacion'
    ];

    if (!eventosConPadrinos.includes(tipo)) {

      padrinos?.setValue('');

    }


    // ---------------------------------------------------------
    // CÓDIGO DE VESTIMENTA
    // ---------------------------------------------------------

    const eventosConVestimenta: TipoEvento[] = [
      'boda',
      'xv_anos',
      'graduacion',
      'aniversario',
      'despedida'
    ];

    if (!eventosConVestimenta.includes(tipo)) {

      codigoVestimenta?.setValue('');

    }


    // ---------------------------------------------------------
    // CONFIRMACIÓN POR WHATSAPP
    // ---------------------------------------------------------

    const eventosConConfirmacion: TipoEvento[] = [
      'boda',
      'xv_anos',
      'cumpleanos',
      'aniversario',
      'baby_shower',
      'despedida'
    ];

    if (eventosConConfirmacion.includes(tipo)) {

      whatsapp?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{10,15}$')
      ]);

    } else {

      whatsapp?.clearValidators();

      whatsapp?.setValue('');
    }


    // ---------------------------------------------------------
    // ACTUALIZAR VALIDACIONES
    // ---------------------------------------------------------

    nombrePareja?.updateValueAndValidity();
    papas?.updateValueAndValidity();
    padrinos?.updateValueAndValidity();
    codigoVestimenta?.updateValueAndValidity();
    whatsapp?.updateValueAndValidity();
  }


  // =========================================================
  // MENSAJE AUTOMÁTICO SEGÚN EL EVENTO
  // =========================================================

  private actualizarMensajeEvento(tipo: TipoEvento): void {

    const mensajes: Partial<Record<TipoEvento, string>> = {

      boda:
        '¡Nos casamos y queremos que seas parte de este momento tan especial!',

      xv_anos:
        'Una hermosa etapa comienza y queremos compartirla contigo.',

      cumpleanos:
        '¡Celebremos juntos un año más de vida!',

      bautizo:
        'Con mucha alegría queremos compartir contigo este día tan especial.',

      primera_comunion:
        'Queremos compartir contigo este momento especial de fe y alegría.',

      confirmacion:
        'Con alegría queremos compartir contigo este momento especial de fe.',

      graduacion:
        'Un sueño se cumple y queremos celebrarlo contigo.',

      aniversario:
        'Celebramos nuestra historia y queremos compartir este momento contigo.',

      baby_shower:
        'Una nueva aventura está por comenzar. ¡Acompáñanos a celebrarla!',

      revelacion_genero:
        'Una gran sorpresa está por descubrirse. ¡Acompáñanos!',

      despedida:
        'Antes de comenzar una nueva aventura, queremos celebrar contigo.',

      presentacion:
        'Con mucha alegría queremos compartir contigo este momento especial.',

      otro:
        'Queremos compartir contigo un momento muy especial.'

    };


    this.formularioTarjeta.patchValue({

      mensajeBienvenida:
        mensajes[tipo] ??
        'Queremos compartir contigo un momento muy especial.'

    });
  }


  // =========================================================
  // GUARDAR INFORMACIÓN Y MOSTRAR TARJETA
  // =========================================================

  guardarYGenerar(destinoTarjeta: string): void {

    // Si el formulario es válido...
    if (this.formularioTarjeta.valid) {

      // Guardamos los datos en el servicio.
      this.traspasoService.actualizarDatos(
        this.formularioTarjeta.getRawValue()
      );

      // Navegamos al diseño seleccionado.
      this.router.navigate([
        `/${destinoTarjeta}`
      ]);

    } else {

      // Marca todos los campos inválidos como tocados.
      // Después podremos mostrar mensajes visuales de error.
      this.formularioTarjeta.markAllAsTouched();

    }
  }

}