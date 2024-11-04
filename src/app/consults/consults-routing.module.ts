import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultsComponent } from './consults.component';
import { DuenoComponent } from './dueno/dueno.component';
import { VeterinarioComponent } from './veterinario/veterinario.component';
import { ConsultasComponent } from './consultas/consultas.component';

const routes: Routes = [
  { path: '', component: ConsultsComponent },
  { path: 'reservar-consulta', component: ConsultasComponent },
  { path: 'consultas-duenio', component: DuenoComponent},
  { path: 'consultas-vet', component: VeterinarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultsRoutingModule { }
