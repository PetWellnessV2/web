import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { BarraUsuarioComponent } from './barra-usuario/barra-usuario.component';
import { VerificacionComponent } from './verificacion/verificacion.component';
import { CodigoComponent } from './codigo/codigo.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    VerificacionComponent,
    CodigoComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SigninComponent,
    BarraUsuarioComponent,
    LoginComponent
  ]
})
export class AuthenticationModule { }
