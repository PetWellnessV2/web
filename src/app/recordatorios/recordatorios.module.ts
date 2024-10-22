import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordatoriosRoutingModule } from './recordatorios-routing.module';
import { RecordatoriosComponent } from './recordatorios.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ProxRecordatoriosComponent } from './prox-recordatorios/prox-recordatorios.component';


@NgModule({
  declarations: [
    RecordatoriosComponent,
    FormularioComponent,
    ProxRecordatoriosComponent
  ],
  imports: [
    CommonModule,
    RecordatoriosRoutingModule
  ]
})
export class RecordatoriosModule { }
