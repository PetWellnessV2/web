import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showCartIcon: boolean = false;
  isCartVisible: boolean = false;
  notificationCount: number = 0;
  userRole: 'duenio' | 'veterinario';

  constructor(private router: Router, private roleService: RoleService) {
    this.userRole = this.roleService.getUserRole();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showCartIcon = this.userRole === 'duenio' ;
      }
    });
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  updateNotificationCount(count: number) {
    this.notificationCount = count;
  }
}
