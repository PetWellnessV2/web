import { AfterViewInit, Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-verificacion',
    standalone: true,
    templateUrl: './verification-email.compenent.html',
    styleUrls: ['./verification-email.compenent.css'],
    imports: [RouterModule, FormsModule],
})
export class VerificationEmailComponent implements AfterViewInit {
    email: string = '';
    emailValido: boolean = false;

    constructor(private UsuarioService: UsuarioService, private http: HttpClient, private router: Router) { }

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

    onEmailChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.email = input.value;
        this.emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    }

    submitForm(): void {
        if (this.emailValido) {
            const headers = new HttpHeaders().set('Content-Type', 'text/plain');
            this.http.post(`${environment.baseURL}/mail/sendMail`, this.email, { headers })
                .subscribe({
                    next: (response) => {
                        console.log('Correo enviado', response);
                        this.router.navigate(['/authentication/verificacion']);
                    },
                    error: (error) => {
                        console.error('Error al enviar el correo', error);
                    }
                });

        }
    }
}
