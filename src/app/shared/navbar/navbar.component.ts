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

  constructor(private authService: AuthService, private router: Router) {}

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
