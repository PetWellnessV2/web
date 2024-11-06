import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showCartIcon: boolean = false;
  isCartVisible: boolean = false;
  notificationCount: number = 0;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

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
  }
}
