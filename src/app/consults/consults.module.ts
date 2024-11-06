import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultsRoutingModule } from './consults-routing.module';
import { ConsultsComponent } from './consults.component';
import { VeterinarioComponent } from './veterinario/veterinario.component';
import { DuenoComponent } from './dueno/dueno.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ConsultasVetComponent } from './consultas-vet/consultas-vet.component';
import { InformeComponent } from './informe/informe.component';
import { PostConsultaComponent } from './post-consulta/post-consulta.component';

@NgModule({
  declarations: [
    ConsultsComponent,
    VeterinarioComponent,
    DuenoComponent,
    ConsultasComponent,
    ConsultasVetComponent,
    InformeComponent,
    PostConsultaComponent
  ],
  imports: [
    CommonModule,
    ConsultsRoutingModule,
    FormsModule,
    MatIconModule
  ]
})
export class ConsultsModule { }