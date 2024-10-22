import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  private UsuarioActivoPorDefecto = new BehaviorSubject<string>('Dueños');

  UsuarioActivo = this.UsuarioActivoPorDefecto.asObservable();

  SetUsuarioActivo(Usuario: string): void {
    this.UsuarioActivoPorDefecto.next(Usuario);
  }

  GetUsuarioActivo(): string {
    return this.UsuarioActivoPorDefecto.getValue();
  }
}
