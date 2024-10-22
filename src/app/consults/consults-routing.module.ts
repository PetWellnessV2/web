import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultsComponent } from './consults.component';

const routes: Routes = [{ path: '', component: ConsultsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultsRoutingModule { }
