import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './historial.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { NotasComponent } from './notas/notas.component';
import { InfoGeneralComponent } from './info-general/info-general.component';
import { InfoGeneralVetComponent } from './info-general-vet/info-general-vet.component';
import { InfoGeneralDuenoComponent } from './info-general-dueno/info-general-dueno.component';
import { HistMedicoComponent } from './hist-medico/hist-medico.component';
import { HistMedicoVetComponent } from './hist-medico-vet/hist-medico-vet.component';
import { HistMedicoDuenoComponent } from './hist-medico-dueno/hist-medico-dueno.component';


@NgModule({
  declarations: [
    HistorialComponent,
    SeccionesComponent,
    ArchivosComponent,
    NotasComponent,
    InfoGeneralComponent,
    InfoGeneralVetComponent,
    InfoGeneralDuenoComponent,
    HistMedicoComponent,
    HistMedicoVetComponent,
    HistMedicoDuenoComponent
  ],
  imports: [
    CommonModule,
    HistorialRoutingModule
  ]
})
export class HistorialModule { }
