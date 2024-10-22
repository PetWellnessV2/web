import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarMascotaRoutingModule } from './registrar-mascota-routing.module';
import { RegistrarMascotaComponent } from './registrar-mascota.component';
import { RegistroComponent } from './registro/registro.component';
import { FotoComponent } from './foto/foto.component';


@NgModule({
  declarations: [
    RegistrarMascotaComponent,
    RegistroComponent,
    FotoComponent
  ],
  imports: [
    CommonModule,
    RegistrarMascotaRoutingModule
  ]
})
export class RegistrarMascotaModule { }
