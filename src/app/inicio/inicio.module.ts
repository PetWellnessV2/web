import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { TareasComponent } from './tareas/tareas.component';
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';
import { AnimalesComponent } from './animales/animales.component';
import { InicioDuenoComponent } from './inicio-dueno/inicio-dueno.component';
import { InicioVetComponent } from './inicio-vet/inicio-vet.component';


@NgModule({
  declarations: [
    InicioComponent,
    TareasComponent,
    RecordatoriosComponent,
    AnimalesComponent,
    InicioDuenoComponent,
    InicioVetComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
