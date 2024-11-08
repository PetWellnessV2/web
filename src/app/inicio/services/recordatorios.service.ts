import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { RecordatorioResponse } from '../models/recordatorio-response.model';
import { AuthService } from '../../services/auth.service';
import { RecordatorioRequest } from '../models/recordatorio.request.model';

export interface Recordatorio {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
}

export interface RecordatorioRegister {
  recordatorioId?: number; // Agregado para ID opcional en caso de actualizar
  title: string;
  description: string;
  date: string; // Fecha en formato string para compatibilidad con input date
  time: string; // Hora en formato string para compatibilidad con input time
  type: string; // Tipo de recordatorio (consulta, revisión, vacunación, etc.)
}

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosService {

  private baseURL = `${environment.baseURL}/recordatorio`; // Ajuste base URL para endpoints de recordatorios
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private authService = inject(AuthService);
  constructor() { }

  // Obtener todos los recordatorios
  obtenerRecordatorios(): Observable<Recordatorio[]> {
    const token = this.getAuthHeaders();

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    return this.http.get<Recordatorio[]>(`${this.baseURL}`, { headers });
  }

  // Obtener un recordatorio específico por ID
  obtenerRecordatorio(id: number): Observable<Recordatorio> {
    const headers = this.getAuthHeaders();
    return this.http.get<Recordatorio>(`${this.baseURL}/usuario/${id}/page`, { headers });
  }

  // Crear un nuevo recordatorio
  addRecordatorio(recordatorio: RecordatorioRegister): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.baseURL}`, recordatorio, { headers });
  }

  // Crear recordatorios automáticos
  addRecordatorioAutomatico(recordatorio: RecordatorioResponse): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.baseURL}/generar-automaticos`, recordatorio, { headers });
  }

  // Eliminar un recordatorio por ID
  eliminarRecordatorio(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseURL}/${id}`, { headers });
  }

  // Generar encabezados de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = this.storageService.getAuthToken();
    return token 
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  }
}
