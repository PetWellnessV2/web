import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { TareasComponent } from './tareas/tareas.component';
import { InicioDuenoComponent } from './inicio-dueno/inicio-dueno.component';

const routes: Routes = [
  { path: 'inicio-dueno', component: InicioDuenoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
