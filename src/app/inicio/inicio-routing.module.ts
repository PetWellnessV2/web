import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioDuenoComponent } from './inicio-dueno/inicio-dueno.component';
import { InicioVetComponent } from './inicio-vet/inicio-vet.component';

const routes: Routes = [
  { path: 'inicio-dueno', component: InicioDuenoComponent },
  { path: 'inicio-vet', component: InicioVetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
