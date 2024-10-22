import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, AfterViewInit {

  UsuarioActivo = '';

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
    const Imagen = document.getElementById("Cuerpo") as HTMLElement;
    switch (this.UsuarioService.GetUsuarioActivo()) {
      case "Dueños": {
        Imagen.style.setProperty("--fondo", `url('./assets/fondo-dueno.png')`);
        break;
      }
      case "Veterinario": {
        Imagen.style.setProperty("--fondo", `url('./assets/fondo-vet.png')`);
        break;
      }
      case "Albergues": {
        Imagen.style.setProperty("--fondo", `url('./assets/fondo-albergue.png')`);
        break;
      }
    }
  }

  OcultarContrasena(){
    const Contrasena = document.getElementById("Ver-contrasena") as HTMLElement;
    const tipo= Contrasena.getAttribute('type') === 'password' ? 'text': 'password';
    Contrasena.setAttribute('type', tipo);
  }

}
