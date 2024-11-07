import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { BarraUsuarioComponent } from '../barra-usuario/barra-usuario.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BarraUsuarioComponent, CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatSnackBarModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, AfterViewInit {

  UsuarioActivo = '';
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  loginForm: FormGroup;

  constructor(private UsuarioService: UsuarioService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onLogin() {
    // Realizar aquí la lógica de autenticación (validar credenciales)
    this.authService.login_();  // Cambia el estado a autenticado
    console.log("Usuario autenticado"); // Redirigir al usuario a la página de inicio
  }

  onSubmit(){
    if(this.loginForm.valid){
      const userData = this.loginForm.value;
      this.authService.login(userData).subscribe({
        next: () => {
          this.onLogin();
          alert('Usuario iniciado correctamente');
          console.log('Usuario iniciado correctamente');
          //this.showSnackBar('Usuario iniciado correctamente');
          switch (this.UsuarioService.GetUsuarioActivo()) {
            case "Dueños": {
              this.router.navigate(['/inicio-dueno']);
              break;
            }
            case "Veterinario": {
              this.router.navigate(['/inicio-vet']);
              break;
            }
            case "Albergues": {
      
              break;
            }
          }
        },
        error: (error) => {
          alert('El correo o la contraseña son incorrectos');
          console.log('Usuario no iniciado correctamente');
          //this.showSnackBar(error.error.message);
        }
      });
    }
  }
  
  private showSnackBar(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 3000
    });
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

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