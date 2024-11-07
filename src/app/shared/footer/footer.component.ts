import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthService, private usuarioService :UsuarioService) {}

  userRole: string = ''; 

  ngOnInit() {
    this.usuarioService.UsuarioActivo.subscribe(role => {
      this.userRole = role;
    });
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }
}
 