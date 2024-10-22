import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent implements OnInit, AfterViewInit{

  UsuarioActivo = '';
  VerContrasena = false;
  VerContrasenaDiferente = false;

  constructor(private UsuarioService: UsuarioService, private ruta: Router) {}

  ngOnInit(): void {
    this.UsuarioService.UsuarioActivo.subscribe(Usuario =>{
      this.UsuarioActivo = Usuario;
    })
  }

  ngAfterViewInit(): void {
    this.CambiarImagen();
  }
  
  CambiarImagen(): void { 
    this.VerContrasena = false;
    this.VerContrasenaDiferente = false;
    const Imagen = document.getElementById("Cuerpo") as HTMLElement;
    const Fondo = document.getElementById("Fondo") as HTMLElement;
    switch (this.UsuarioService.GetUsuarioActivo()) {
      case "Dueños": {
        Imagen.style.setProperty("--fondo", `url('/assets/fondo-dueno.png')`);
        Fondo.style.setProperty("--tamano", "1330px");
        break;
      }
      case "Veterinario": {
        Imagen.style.setProperty("--fondo", `url('/assets/fondo-vet.png')`);
        Fondo.style.setProperty("--tamano", "1539px");
        break;
      }
      case "Albergues": {
        Imagen.style.setProperty("--fondo", `url('/assets/fondo-albergue.png')`);
        Fondo.style.setProperty("--tamano", "1539px");
        break;
      }
    }
  }

  OcultarContrasena(){
    const Contrasena_1 = document.getElementById("Ver-contrasena_1") as HTMLInputElement;
    const Contrasena_2 = document.getElementById("Ver-contrasena_2") as HTMLInputElement;
    const tipo= Contrasena_1.getAttribute('type') === 'password' ? 'text': 'password';
    Contrasena_1.setAttribute('type', tipo);
    Contrasena_2.setAttribute('type', tipo);
  }

  ValidarFormulario(): boolean {
    const Contrasena_1 = document.getElementById("Ver-contrasena_1") as HTMLInputElement;
    const Contrasena_2 = document.getElementById("Ver-contrasena_2") as HTMLInputElement;
    const patron_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    if (Contrasena_1.value !== Contrasena_2.value) {
      this.VerContrasenaDiferente = true;
    }
    if (!patron_password.test(Contrasena_1.value)) {
      this.VerContrasena = true;
    }
    if (!patron_password.test(Contrasena_2.value)) {
      this.VerContrasenaDiferente = true;
    }
    if (Contrasena_1.value !== Contrasena_2.value || !patron_password.test(Contrasena_1.value) || !patron_password.test(Contrasena_2.value)) {
      return false;
    }
    return true;
  }
  
  Cambiar_contrasena(): void {
    if (this.ValidarFormulario()) {
      this.ruta.navigate(['/authentication/login']);
    }
  }
}