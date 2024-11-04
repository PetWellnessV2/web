import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultsRoutingModule } from './consults-routing.module';
import { ConsultsComponent } from './consults.component';
import { VeterinarioComponent } from './veterinario/veterinario.component';
import { DuenoComponent } from './dueno/dueno.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultsComponent,
    VeterinarioComponent,
    DuenoComponent,
    ConsultasComponent
  ],
  imports: [
    CommonModule,
    ConsultsRoutingModule,
    FormsModule
  ]
})
export class ConsultsModule { }
