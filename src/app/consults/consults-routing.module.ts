import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultsComponent } from './consults.component';
import { DuenoComponent } from './dueno/dueno.component';
import { VeterinarioComponent } from './veterinario/veterinario.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { PostConsultaComponent } from './post-consulta/post-consulta.component';
import { InformeComponent } from './informe/informe.component';
import { ConsultasVetComponent } from './consultas-vet/consultas-vet.component';

const routes: Routes = [
  { path: '', component: ConsultsComponent },
  { path: 'reservar-consulta', component: ConsultasComponent },
  { path: 'reservar-consulta-vet', component: ConsultasVetComponent },
  { path: 'consultas-duenio', component: DuenoComponent},
  { path: 'consultas-vet', component: VeterinarioComponent},
  { path: 'consultas-vet-post', component: PostConsultaComponent},
  { path: 'informe', component: InformeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultsRoutingModule { }
