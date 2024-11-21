import { UsuarioService } from './../../services/usuario.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.css']
})
export class CodigoComponent implements OnInit {

  UsuarioActivo = '';
  mensaje: string = '';  
  errorMessage: string = ''; 
  token: string = ''; 

  constructor(
    private UsuarioService: UsuarioService, 
    private http: HttpClient, 
    private router: Router, 
    private tokenService: TokenService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    // Obtener el token desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token']; 
      if (this.token) {
        this.redirigirArestablecer(); 
      } else {
        this.errorMessage = 'El enlace es inválido o no contiene un token.';
      }
    });

    // Lógica para cambiar imagen según el tipo de usuario
    this.UsuarioService.UsuarioActivo.subscribe(Usuario => {
      this.UsuarioActivo = Usuario;
    });

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

  // Método que se llamará cuando el enlace del correo sea visitado
  redirigirArestablecer() {
    if (this.token) {
      this.http.get<boolean>(`${environment.baseURL}/mail/reset/check/${this.token}`)
        .subscribe({
          next: (response: boolean) => {
            if (response) {
              this.tokenService.setToken(this.token);
              this.router.navigate(['/authentication/cambiar-contrasena']);
            } else {
              this.errorMessage = 'El token es inválido o ha expirado.';
            }
          },
          error: (error) => {
            console.error('Error al verificar el token', error);
            this.errorMessage = 'Hubo un problema al verificar el token. Intenta nuevamente.';
          }
        });
    } else {
      this.errorMessage = 'No se encontró el token en la URL.';
    }
  }
}
