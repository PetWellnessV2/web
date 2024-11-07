import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarMascotaRoutingModule } from './registrar-mascota-routing.module';
import { RegistrarMascotaComponent } from './registrar-mascota.component';
import { RegistroComponent } from './registro/registro.component';
import { FotoComponent } from './foto/foto.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    RegistrarMascotaComponent,
    RegistroComponent,
    FotoComponent
  ],
  imports: [
    CommonModule,
    RegistrarMascotaRoutingModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RegistrarMascotaModule { }
