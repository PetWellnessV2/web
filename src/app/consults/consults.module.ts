import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultsRoutingModule } from './consults-routing.module';
import { ConsultsComponent } from './consults.component';
import { VeterinarioComponent } from './veterinario/veterinario.component';
import { DuenoComponent } from './dueno/dueno.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { FormsModule } from '@angular/forms';
import { PostConsultaComponent } from './post-consulta/post-consulta.component';
import { MatIconModule } from '@angular/material/icon';
import { InformeComponent } from './informe/informe.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConsultasVetComponent } from './consultas-vet/consultas-vet.component';

@NgModule({
  declarations: [
    ConsultsComponent,
    VeterinarioComponent,
    DuenoComponent,
    ConsultasComponent,
    PostConsultaComponent,
    InformeComponent,
    ConsultasVetComponent
  ],
  imports: [
    CommonModule,
    ConsultsRoutingModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ConsultsModule { }