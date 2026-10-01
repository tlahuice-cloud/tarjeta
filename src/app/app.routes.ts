import { Routes } from '@angular/router';
import { Entrada } from './compomentes/animacion/entrada/entrada';
import { Invitacion } from './compomentes/animacion/invitacion/invitacion';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'full'
  },
  {
    path: 'formulario',
    loadComponent: () => import('./pages/formulario/formulario').then(m => m.FormularioComponent)
  },
  {
    path: 'tarjeta1',
    loadComponent: () => import('./pages/tarjeta1/tarjeta1').then(m => m.Tarjeta1)
  },
  {
    path: 'tarjeta2',
    loadComponent: () => import('./pages/tarjeta2/tarjeta2').then(m => m.Tarjeta2)
  },
  {
    path: 'tarjeta3',
    loadComponent: () => import('./pages/tarjeta3/tarjeta3').then(m => m.Tarjeta3)
  },
 {
    path: 'entrada', component: Entrada  },
   {
    path: 'invitacion', component: Invitacion  }


];

 /*{
    path: '**',
    redirectTo: 'formulario'
  }; */