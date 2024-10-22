import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarConsultaComponent } from './reservar-consulta.component';

const routes: Routes = [{ path: '', component: ReservarConsultaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservarConsultaRoutingModule { }
