import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { TareasComponent } from './tareas/tareas.component';
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';
import { AnimalesComponent } from './animales/animales.component';
import { InicioDuenoComponent } from './inicio-dueno/inicio-dueno.component';
import { InicioVetComponent } from './inicio-vet/inicio-vet.component';
import { ProxConsultasComponent } from './prox-consultas/prox-consultas.component';
import { ProxPacientesComponent } from './prox-pacientes/prox-pacientes.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InicioComponent,
    TareasComponent,
    RecordatoriosComponent,
    AnimalesComponent,
    InicioDuenoComponent,
    InicioVetComponent,
    ProxConsultasComponent,
    ProxPacientesComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    FormsModule
  ]
})
export class InicioModule { }
