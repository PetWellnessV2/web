import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit, AfterViewInit {
  
  UsuarioActivo = '';
  VerTelefono = false;
  VerEmail = false;
  VerContrasena = false;
  VerContrasenaDiferente = false;

  constructor(private UsuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.UsuarioService.UsuarioActivo.subscribe(Usuario =>{
      this.UsuarioActivo = Usuario;
    })
  }

  ngAfterViewInit(): void {
    this.CambiarImagen();
  }
  
  CambiarImagen(): void { 
    this.VerTelefono = false;
    this.VerEmail = false;
    this.VerContrasena = false;
    this.VerContrasenaDiferente = false;
    const Imagen = document.getElementById("Cuerpo") as HTMLElement;
    const Fondo = document.getElementById("Fondo") as HTMLElement;
    switch (this.UsuarioService.GetUsuarioActivo()) {
      case "Dueños": {
        Imagen.style.setProperty("--fondo", `url('./assets/fondo-dueno.png')`);
        Fondo.style.setProperty("--tamano", "1330px");
        break;
      }
      case "Veterinario": {
        Imagen.style.setProperty("--fondo", `url('./assets/fondo-vet.png')`);
        Fondo.style.setProperty("--tamano", "1539px");
        break;
      }
      case "Albergues": {
        Imagen.style.setProperty("--fondo", `url('./assets/fondo-albergue.png')`);
        Fondo.style.setProperty("--tamano", "1539px");
        break;
      }
    }
  }

  Mostrar(): string {
    return this.UsuarioService.GetUsuarioActivo();
  }

  OcultarContrasena(){
    const Contrasena_1 = document.getElementById("Ver-contrasena_1") as HTMLInputElement;
    const Contrasena_2 = document.getElementById("Ver-contrasena_2") as HTMLInputElement;
    const tipo= Contrasena_1.getAttribute('type') === 'password' ? 'text': 'password';
    Contrasena_1.setAttribute('type', tipo);
    Contrasena_2.setAttribute('type', tipo);
  }

  ValidarTelefono(): boolean {
    const patron_phone = /^\d{9}$/;
    const Telefono = document.getElementById("Telefono") as HTMLInputElement;
    return patron_phone.test(Telefono.value);
  }

  ValidarEmail(): boolean {
    const patron_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const Email = document.getElementById("Email") as HTMLInputElement;
    return patron_email.test(Email.value)
  }

  ValidarFormulario(): boolean {
    const Contrasena_1 = document.getElementById("Ver-contrasena_1") as HTMLInputElement;
    const Contrasena_2 = document.getElementById("Ver-contrasena_2") as HTMLInputElement;
    const patron_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    const Fondo = document.getElementById("Fondo") as HTMLElement;
    if (!this.ValidarEmail()){
      this.VerEmail = true;
    }
    if (!this.ValidarTelefono()) {
      this.VerTelefono = true;
    }
    if (Contrasena_1.value !== Contrasena_2.value) {
      this.VerContrasenaDiferente = true;
    }
    if (!patron_password.test(Contrasena_1.value)) {
      this.VerContrasena = true;
    }
    if (!patron_password.test(Contrasena_2.value)) {
      this.VerContrasenaDiferente = true;
    }
    
    if (!this.ValidarEmail() || !this.ValidarTelefono() || Contrasena_1.value !== Contrasena_2.value || !patron_password.test(Contrasena_1.value) || !patron_password.test(Contrasena_2.value)) {
      switch (this.UsuarioService.GetUsuarioActivo()) {
        case "Dueños": {
          Fondo.style.setProperty("--tamano", "1410px");
          break;
        }
        case "Veterinario": {
          Fondo.style.setProperty("--tamano", "1619px");
          break;
        }
        case "Albergues": {
          Fondo.style.setProperty("--tamano", "1619px");
          break;
        }
      }
      return false;
    }

    return true;
  }
}
