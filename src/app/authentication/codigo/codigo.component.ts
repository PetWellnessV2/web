import { UsuarioService } from './../../services/usuario.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css'
})
export class CodigoComponent implements OnInit{

  UsuarioActivo = '';
  token: string = '';
  errorMessage: string = '';

  constructor(private UsuarioService: UsuarioService, private http: HttpClient, private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.UsuarioService.UsuarioActivo.subscribe(Usuario =>{
      this.UsuarioActivo = Usuario;
    })
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

  onTokenChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.token = input.value;
  }

  verifyToken(): void {
    if (this.token) {
      // Realizar la solicitud GET al backend para verificar el token
      this.http.get<boolean>(`${environment.baseURL}/mail/reset/check/${this.token}`)
        .subscribe({
          next: (response: boolean) => {
            if (response) {
              this.tokenService.setToken(this.token);
              this.router.navigate(['/authentication/cambiar-contrasena']);
            } else {
              this.errorMessage = 'El código ingresado es incorrecto o ha expirado.';
            }
          },
          error: (error) => {
            console.error('Error al verificar el token', error);
            this.errorMessage = 'Hubo un problema al verificar el código. Intenta nuevamente.';
          }
        });
    }
  }
  
}
