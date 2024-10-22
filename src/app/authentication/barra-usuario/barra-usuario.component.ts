import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-usuario',
  templateUrl: './barra-usuario.component.html',
  styleUrl: './barra-usuario.component.css'
})
export class BarraUsuarioComponent implements OnInit {

  UsuarioActivo: string = '';

  constructor(private UsuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.UsuarioService.UsuarioActivo.subscribe(Usuario =>{
      this.UsuarioActivo = Usuario;
    })
  }

  CambiarUsuario(Usuario: string): void {
    this.UsuarioService.SetUsuarioActivo(Usuario);
  }
 }
