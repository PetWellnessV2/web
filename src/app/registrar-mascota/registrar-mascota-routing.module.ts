import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarMascotaComponent } from './registrar-mascota.component';

const routes: Routes = [{ path: '', component: RegistrarMascotaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarMascotaRoutingModule { }
