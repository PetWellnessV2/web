import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private usuarioService: UsuarioService, private authService: AuthService) {}

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
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  updateNotificationCount(count: number) {
    this.notificationCount = count;


  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }
  onLogout(): void {
    this.authService.logout_();  // Cambia el estado a no autenticado
    this.authService.logout();
    this.router.navigate(['/authentication/login']);  // Redirige a la pantalla de login
  }
  setActiveLabel(label: string){
    this.activeLabel = label;

  }
}
