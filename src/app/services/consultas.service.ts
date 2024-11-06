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

export interface InformeRequest {
  idMascota: number;
  presionArterial: number;
  pulso: number;
  temperatura: number;
  peso: number;
  altura: number;
}

export interface NotaConsultaRequest {
  idMascota: number;
  descripcion: string;
}

export interface NotaConsultaResponse {
  idMascota: number;
  descripcion: string;
  fecha: string;
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

  obtenerExamen(mascotaId: number): Observable<InformeRequest[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<InformeRequest[]>(`${this.baseURL}/examenes-fisicos/mascotas/${mascotaId}/examenes-fisicos`, { headers });
  }

  obtenerNota(mascotaId: number): Observable<NotaConsultaResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<NotaConsultaResponse[]>(`${this.baseURL}/notas-consulta/mascotas/${mascotaId}/notas`, { headers });
  }

  obtenerHorarios(): Observable<Horario[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<Horario[]>(`${this.baseURL}/horarios-disponibles`, { headers });
    }

    obtenerHorariosVet(vetid: number): Observable<Horario[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<Horario[]>(`${this.baseURL}/horarios-disponibles/veterinario/${vetid}`, { headers });
    }

  registrarReserva(reserva: ReservaRequest): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.post<void>(`${this.baseURL}/consultas`, reserva, { headers });
    }

    registrarInforme(informe: InformeRequest): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.post<void>(`${this.baseURL}/examenes-fisicos`, informe, { headers });
    }

    registrarNotaConsulta(notaConsulta: NotaConsultaRequest): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.post<void>(`${this.baseURL}/notas-consulta`, notaConsulta, { headers });
    }


  private getAuthHeaders(): HttpHeaders {
      const token = this.storageService.getAuthToken();
      return token 
          ? new HttpHeaders().set('Authorization', `Bearer ${token}`) 
          : new HttpHeaders();
  }
}
