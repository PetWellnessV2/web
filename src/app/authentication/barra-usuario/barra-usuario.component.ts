import { CommonModule } from '@angular/common';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-usuario',
  standalone: true,
  templateUrl: './barra-usuario.component.html',
  styleUrl: './barra-usuario.component.css',
  imports: [CommonModule]
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
