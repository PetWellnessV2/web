import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  activeLabel: string = 'Inicio';
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router, private UsuarioService :UsuarioService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }
  onLogout(): void {
    this.authService.logout_();
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }
  setActiveLabel(label: string){
    this.activeLabel = label;
  }
  OnClickMascota(){
    switch (this.UsuarioService.GetUsuarioActivo()) {
      case "Dueños": {
        console.log("Vista dueño mascota");
        this.router.navigate(['/mascotas-dueno']);
        break;
      }
      case "Veterinario": {
        console.log("Vista vet mascota");
        this.router.navigate(['/mascotas']);
        break;
      }
      case "Albergues": {

        break;
      }
    }
  }
  OnClickConsulta(){
    switch (this.UsuarioService.GetUsuarioActivo()) {
      case "Dueños": {
        console.log("Vista dueño consulta");
        this.router.navigate(['/consults/consultas-duenio']);
        break;
      }
      case "Veterinario": {
        console.log("Vista vet consulta");
        this.router.navigate(['/consults/consultas-vet']);
        break;
      }
      case "Albergues": {

        break;
      }
    }
  }
}
