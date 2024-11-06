import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioDuenoComponent } from './inicio-dueno/inicio-dueno.component';
import { InicioVetComponent } from './inicio-vet/inicio-vet.component';
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';
import { ProxConsultasComponent } from './prox-consultas/prox-consultas.component';
import { ProxPacientesComponent } from './prox-pacientes/prox-pacientes.component';
import { TareasComponent } from './tareas/tareas.component';

const routes: Routes = [
  { path: 'inicio-dueno', component: InicioDuenoComponent },
  { path: 'inicio-vet', component: InicioVetComponent },
  { path: 'add-reminder', component: RecordatoriosComponent },
  { path: 'prox-consulta', component: ProxConsultasComponent },
  { path: 'prox-paciente', component: ProxPacientesComponent },
  { path: 'tareas', component: TareasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
