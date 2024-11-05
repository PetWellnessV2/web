import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

export interface Consulta {
  idConsulta: number;
  nombre_mascota: string;
  tipoConsulta: string;
  estadoConsulta: string;
  fecha: string;
  hora: string;
  razonConsulta: string;
}

export interface Mascota {
  idMascota: number;
  nombre: string;
}

export interface Horario {
  idHorario: number;
  veterinario_nombre: string;
  hora: string;
  fecha: string;
}

export interface ReservaRequest {
  idMascota: number;
  idHorario: number;
  tipoConsulta: string;
  razonConsulta: string;
  estadoConsulta: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private baseURL = `${environment.baseURL}`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  constructor() { }

  obtenerConsultas(): Observable<Consulta[]> {
    const token = this.storageService.getAuthToken();
    
    const headers = token 
        ? new HttpHeaders().set('Authorization', `Bearer ${token}`) 
        : new HttpHeaders();

    return this.http.get<Consulta[]>(`${this.baseURL}/consultas`, { headers });
  }

  eliminarConsulta(idConsulta: number): Observable<void> {
    const token = this.storageService.getAuthToken();
    const headers = token 
        ? new HttpHeaders().set('Authorization', `Bearer ${token}`) 
        : new HttpHeaders();

    return this.http.delete<void>(`${this.baseURL}/consultas/${idConsulta}`, { headers });
  }

  obtenerMascotas(): Observable<Mascota[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Mascota[]>(`${this.baseURL}/admin/registromascotas`, { headers });
  }

  obtenerHorarios(): Observable<Horario[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<Horario[]>(`${this.baseURL}/horarios-disponibles`, { headers });
    }

  registrarReserva(reserva: ReservaRequest): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.post<void>(`${this.baseURL}/consultas`, reserva, { headers });
    }

  private getAuthHeaders(): HttpHeaders {
      const token = this.storageService.getAuthToken();
      return token 
          ? new HttpHeaders().set('Authorization', `Bearer ${token}`) 
          : new HttpHeaders();
  }
}
