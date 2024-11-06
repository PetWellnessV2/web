import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarMascotaComponent } from './registrar-mascota.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', component: RegistrarMascotaComponent },
  { path: 'registrar', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarMascotaRoutingModule { }
