import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { RecordatorioResponse } from '../models/recordatorio-response.model';

export interface Recordatorio {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosService {

  private baseURL = `${environment.baseURL}/recordatorios`; // Ajuste base URL para endpoints de recordatorios
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  constructor() { }

  // Obtener todos los recordatorios
  obtenerRecordatorios(): Observable<Recordatorio[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Recordatorio[]>(`${this.baseURL}`, { headers });
  }

  // Obtener un recordatorio específico por ID
  obtenerRecordatorio(id: number): Observable<Recordatorio> {
    const headers = this.getAuthHeaders();
    return this.http.get<Recordatorio>(`${this.baseURL}/${id}`, { headers });
  }

  // Crear un nuevo recordatorio
  addRecordatorio(recordatorio: RecordatorioResponse): Observable<void> {
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
