import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent implements OnInit, AfterViewInit {

  UsuarioActivo = '';
  VerContrasena = false;
  VerContrasenaDiferente = false;
  token: string = '';
  nuevaContrasena: string = '';
  confirmacionContrasena: string = '';
  errorMessage: string = '';
  mostrarConfirmacion = false;


  constructor(private UsuarioService: UsuarioService, private http: HttpClient, private ruta: Router, private route: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();

    this.UsuarioService.UsuarioActivo.subscribe(Usuario => {
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

  OcultarContrasena() {
    const Contrasena_1 = document.getElementById("Ver-contrasena_1") as HTMLInputElement;
    const Contrasena_2 = document.getElementById("Ver-contrasena_2") as HTMLInputElement;
    const tipo = Contrasena_1.getAttribute('type') === 'password' ? 'text' : 'password';
    Contrasena_1.setAttribute('type', tipo);
    Contrasena_2.setAttribute('type', tipo);
  }

  ValidarFormulario(): boolean {
    const patron_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;

    this.VerContrasenaDiferente = this.nuevaContrasena !== this.confirmacionContrasena;
    this.VerContrasena = !patron_password.test(this.nuevaContrasena) || !patron_password.test(this.confirmacionContrasena);

    return !this.VerContrasena && !this.VerContrasenaDiferente;
  }

  isFormValid(): boolean {
    return this.ValidarFormulario();
  }

  Cambiar_contrasena(): void {
    if (this.ValidarFormulario()) {
      this.http.post(
        `${environment.baseURL}/mail/reset/${this.token}`,
        this.nuevaContrasena,  
        {
          headers: {
            'Content-Type': 'text/plain'  
          }
        }
      )
      .subscribe({
        next: () => {
          this.mostrarConfirmacion = true;
        },
        error: (err) => {
          this.errorMessage = 'Error al cambiar la contraseña. Intenta de nuevo.';
          console.error(err);
        }
      });
    }
  }
  
  cerrarPopup(): void {
    this.mostrarConfirmacion = false;  
    this.ruta.navigate(['/authentication/login']);  
  }

}
