import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarConsultaRoutingModule } from './reservar-consulta-routing.module';
import { ReservarConsultaComponent } from './reservar-consulta.component';
import { RegistroComponent } from './registro/registro.component';
import { HorariosComponent } from './horarios/horarios.component';


@NgModule({
  declarations: [
    ReservarConsultaComponent,
    RegistroComponent,
    HorariosComponent
  ],
  imports: [
    CommonModule,
    ReservarConsultaRoutingModule
  ]
})
export class ReservarConsultaModule { }
