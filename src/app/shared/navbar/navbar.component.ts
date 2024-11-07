import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showCartIcon: boolean = false;
  isCartVisible: boolean = false;
  notificationCount: number = 0;
  activeLabel: string = 'Inicio';
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router, private UsuarioService :UsuarioService, private usuarioService: UsuarioService) {}

  userRole: string = ''; 

  ngOnInit() {
    this.usuarioService.UsuarioActivo.subscribe(role => {
      this.userRole = role;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isCartVisible = this.userRole === 'dueño' && event.url === '/inicio-dueno';
    });
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  updateNotificationCount(count: number) {
    this.notificationCount = count;
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
