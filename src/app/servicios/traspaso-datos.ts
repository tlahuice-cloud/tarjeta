import { Injectable, signal } from '@angular/core';


// ============================================================
// TIPOS DE EVENTO
// ============================================================
// Esta lista debe coincidir con los valores utilizados
// en el <select> del formulario.html.
//
// IMPORTANTE:
// Antes utilizábamos "xix_anos".
// Ahora utilizaremos "xv_anos" de forma consistente.
// ============================================================

export type TipoEvento =
  | 'boda'
  | 'xv_anos'
  | 'cumpleanos'
  | 'bautizo'
  | 'primera_comunion'
  | 'confirmacion'
  | 'graduacion'
  | 'aniversario'
  | 'baby_shower'
  | 'revelacion_genero'
  | 'despedida'
  | 'presentacion'
  | 'otro';


// ============================================================
// DATOS DE LA TARJETA
// ============================================================
// Esta interfaz define toda la información que podrá
// viajar desde el formulario hacia las tarjetas.
//
// Los campos opcionales (?) permiten que determinadas
// celebraciones no tengan información que no necesitan.
//
// Ejemplo:
//
// Cumpleaños
// -> nombreFestejado
// -> fecha
// -> hora
//
// Boda
// -> nombreFestejado
// -> nombrePareja
// -> papas
// -> fecha
// -> etc.
//
// Bautizo
// -> nombreFestejado
// -> papas
// -> padrinos
// -> fecha
// -> etc.
// ============================================================

export interface DatosTarjeta {

  // ----------------------------------------------------------
  // TIPO DE EVENTO
  // ----------------------------------------------------------

  tipoEvento: TipoEvento;


  // ----------------------------------------------------------
  // NOMBRES PRINCIPALES
  // ----------------------------------------------------------

  // Nombre principal del evento.
  //
  // Ejemplos:
  // - Novio / Novia
  // - Quinceañera
  // - Cumpleañero
  // - Bautizado
  // - Graduado
  nombreFestejado: string;


  // Segundo nombre.
  //
  // Principalmente:
  // - Boda
  // - Aniversario
  nombrePareja?: string;


  // ----------------------------------------------------------
  // PADRES Y PADRINOS
  // ----------------------------------------------------------

  // Padres de los festejados.
  papas?: string;


  // Padrinos.
  //
  // Puede utilizarse en:
  // - XV años
  // - Bautizo
  // - Primera Comunión
  // - Confirmación
  padrinos?: string;


  // ----------------------------------------------------------
  // FECHA Y HORA
  // ----------------------------------------------------------

  fecha: string;

  hora: string;


  // ----------------------------------------------------------
  // UBICACIÓN
  // ----------------------------------------------------------

  nombreLugar: string;

  direccion: string;

  linkUbicacionMaps: string;


  // ----------------------------------------------------------
  // MENSAJE
  // ----------------------------------------------------------

  mensajeBienvenida: string;


  // ----------------------------------------------------------
  // CÓDIGO DE VESTIMENTA
  // ----------------------------------------------------------

  codigoVestimenta: string;


  // ----------------------------------------------------------
  // CONFIRMACIÓN
  // ----------------------------------------------------------

  numeroWhatsAppConfirmacion: string;


  // ----------------------------------------------------------
  // GALERÍA
  // ----------------------------------------------------------
  // Por ahora almacenaremos las fotografías como URLs
  // o posteriormente podremos utilizar Base64.
  //
  // Más adelante este arreglo será utilizado por:
  // componentes/galeria
  // ----------------------------------------------------------

  galeriaFotos: string[];

}


// ============================================================
// SERVICIO
// ============================================================

@Injectable({
  providedIn: 'root'
})
export class TraspasoDatosService {


  // ==========================================================
  // ESTADO PRINCIPAL
  // ==========================================================
  // Signal privado.
  //
  // Ningún componente externo puede modificarlo directamente.
  // Los componentes solamente podrán leerlo mediante
  // el Signal público "datos".
  // ==========================================================

  private datosState = signal<DatosTarjeta>({

    // Evento inicial
    tipoEvento: 'boda',


    // Nombres
    nombreFestejado: '',

    nombrePareja: '',


    // Padres y padrinos
    papas: '',

    padrinos: '',


    // Fecha y hora
    fecha: '',

    hora: '',


    // Lugar
    nombreLugar: '',

    direccion: '',

    linkUbicacionMaps: '',


    // Mensaje inicial
    mensajeBienvenida:
      '¡Acompáñanos a celebrar este día tan especial!',


    // Código de vestimenta
    codigoVestimenta: 'Formal',


    // WhatsApp
    numeroWhatsAppConfirmacion: '',


    // Galería
    galeriaFotos: []

  });


  // ==========================================================
  // SIGNAL PÚBLICO DE SOLO LECTURA
  // ==========================================================
  // Las tarjetas podrán hacer:
  //
  // this.traspasoService.datos()
  //
  // pero NO podrán modificar directamente el estado.
  // ==========================================================

  readonly datos =
    this.datosState.asReadonly();


  // ==========================================================
  // ACTUALIZAR DATOS
  // ==========================================================
  // Recibe solamente los datos que queremos modificar.
  //
  // Ejemplo:
  //
  // actualizarDatos({
  //   nombreFestejado: 'Ana',
  //   fecha: '2026-12-20'
  // });
  //
  // Los demás datos permanecen intactos.
  // ==========================================================

  actualizarDatos(
    nuevosDatos: Partial<DatosTarjeta>
  ): void {

    this.datosState.update(
      actuales => ({
        ...actuales,
        ...nuevosDatos
      })
    );

  }


  // ==========================================================
  // OBTENER DATOS
  // ==========================================================
  // Devuelve una fotografía actual del estado.
  //
  // Será útil cuando necesitemos trabajar con los datos
  // desde TypeScript sin utilizar directamente el Signal.
  // ==========================================================

  obtenerDatos(): DatosTarjeta {

    return this.datosState();

  }

}