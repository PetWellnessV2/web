import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { RecordatorioResponse } from '../models/recordatorio-response.model';

export interface Recordatorio {
  id: number;
  name: string;
  time: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosService {

  private baseURL = `${environment.baseURL}`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  constructor() { }


  obtenerRecordatorios(): Observable<Recordatorio[]> {
    const token = this.storageService.getAuthToken();
    
    const headers = token 
        ? new HttpHeaders().set('Authorization', `Bearer ${token}`) 
        : new HttpHeaders();

    return this.http.get<Recordatorio[]>(`${this.baseURL}/admin/recordatorios`, { headers });
  }

  eliminarRecordatorio(id: number): Observable<void> {
    const token = this.storageService.getAuthToken();
    const headers = token 
        ? new HttpHeaders().set('Authorization', `Bearer ${token}`) 
        : new HttpHeaders();

    return this.http.delete<void>(`${this.baseURL}/admin/recordatorios/${id}`, { headers });
  }

  obtenerRecordatorio(id: number): Observable<Recordatorio[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Recordatorio[]>(`${this.baseURL}/admin/recordatorio/${id}`, { headers });
  }

  addRecordatorioAutomatico(recordatorio: RecordatorioResponse): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.baseURL}/admin/recordatorio/generar-automaticos`, recordatorio, { headers });
  }

  addRecordatorio(recordatorio: any): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.baseURL}/recordatorios`, recordatorio, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
      const token = this.storageService.getAuthToken();
      return token 
          ? new HttpHeaders().set('Authorization', `Bearer ${token}`) 
          : new HttpHeaders();
  }
}
