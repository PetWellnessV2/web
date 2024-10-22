import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'reservar-consulta', loadChildren: () => import('./reservar-consulta/reservar-consulta.module').then(m => m.ReservarConsultaModule) },
  { path: 'recordatorios', loadChildren: () => import('./recordatorios/recordatorios.module').then(m => m.RecordatoriosModule) },
  { path: 'historial', loadChildren: () => import('./historial/historial.module').then(m => m.HistorialModule) },
  { path: 'meeting', loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule) },
  { path: 'consults', loadChildren: () => import('./consults/consults.module').then(m => m.ConsultsModule) },
  { path: 'registrar-mascota', loadChildren: () => import('./registrar-mascota/registrar-mascota.module').then(m => m.RegistrarMascotaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
