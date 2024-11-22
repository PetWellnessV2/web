import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.css']
})
export class CodigoComponent implements OnInit {
  token: string = '';
  mensaje: string = '';
  errorMessage: string = '';
  mostrarFormulario: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router
  ) { }

  navegarACambiarContrasena() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/authentication/cambiar-contrasena']);
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];  // Capturar el token de la URL
      if (this.token) {
        this.validarToken();  // Validar el token al cargar la página
      }
    });
  }

  // Validar el token y mostrar el formulario si es válido
  validarToken() {
    this.http.get<boolean>(`${environment.baseURL}/mail/reset/check/${this.token}`)
      .subscribe({
        next: (response: boolean) => {
          if (response) {
            this.tokenService.setToken(this.token);
            this.navegarACambiarContrasena(); 
          } else {
            this.errorMessage = 'El token es inválido o ha expirado.';
          }
        },
        error: (error) => {
          console.error('Error al verificar el token', error);
          this.errorMessage = 'Hubo un problema al verificar el token. Intenta nuevamente.';
        }
      });
  }

}
