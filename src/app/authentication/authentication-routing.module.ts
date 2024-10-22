import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { BarraUsuarioComponent } from './barra-usuario/barra-usuario.component';
import { SigninComponent } from './signin/signin.component';
import { VerificacionComponent } from './verificacion/verificacion.component';
import { CodigoComponent } from './codigo/codigo.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'barra', component: BarraUsuarioComponent},
  { path: 'verificacion', component: VerificacionComponent},
  { path: 'codigo', component: CodigoComponent},
  { path: 'cambiar-contrasena', component: CambiarContrasenaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
