import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarConsultaComponent } from './reservar-consulta.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', component: ReservarConsultaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservarConsultaRoutingModule { }
