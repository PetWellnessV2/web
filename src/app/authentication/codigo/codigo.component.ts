import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css'
})
export class CodigoComponent implements OnInit{

  UsuarioActivo = '';

  constructor(private UsuarioService: UsuarioService) {}

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
}
