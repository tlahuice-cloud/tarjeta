import { Routes } from '@angular/router';

import { Entrada } from './compomentes/animacion/entrada/entrada';
import { Invitacion } from './compomentes/animacion/invitacion/invitacion';

export const routes: Routes = [

  // Ruta inicial
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'full'
  },

  // Formulario principal
  {
    path: 'formulario',
    loadComponent: () =>
      import('./pages/formulario/formulario')
        .then(m => m.FormularioComponent)
  },

  // Tarjeta 1
  {
    path: 'tarjeta1',
    loadComponent: () =>
      import('./pages/tarjeta1/tarjeta1')
        .then(m => m.Tarjeta1)
  },

  // Tarjeta 2
  {
    path: 'tarjeta2',
    loadComponent: () =>
      import('./pages/tarjeta2/tarjeta2')
        .then(m => m.Tarjeta2)
  },

  // Tarjeta 3
  {
    path: 'tarjeta3',
    loadComponent: () =>
      import('./pages/tarjeta3/tarjeta3')
        .then(m => m.Tarjeta3)
  },

  // Prueba de la animación del sobre
  {
    path: 'entrada',
    component: Entrada
  },

  // Prueba de la animación de invitación
  {
    path: 'invitacion',
    component: Invitacion
  },

  // Ruta para cualquier dirección inexistente
  {
    path: '**',
    redirectTo: 'formulario'
  }

];