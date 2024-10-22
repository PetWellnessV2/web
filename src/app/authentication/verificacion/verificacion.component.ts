import { AfterViewInit, Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent implements AfterViewInit {

  constructor(private UsuarioService: UsuarioService) {}

  ngAfterViewInit(): void {
    this.CambiarImagen();
  }

  CambiarImagen(): void { 
    const Imagen = document.getElementById("Cuerpo") as HTMLElement;
    switch (this.UsuarioService.GetUsuarioActivo()) {
      case "Dueños": {
        Imagen.style.setProperty("--fondo", `url('/assets/fondo-dueno.png')`);
        break;
      }
      case "Veterinario": {
        Imagen.style.setProperty("--fondo", `url('/assets/fondo-vet.png')`);
        break;
      }
      case "Albergues": {
        Imagen.style.setProperty("--fondo", `url('/assets/fondo-albergue.png')`);
        break;
      }
    }
  }
}
