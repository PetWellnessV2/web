import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MascotaResponse } from '../interfaces/mascota-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private baseUrl: string = environment.baseURL;
  private http = inject(HttpClient);
  

  getCMascotas()  : Observable<MascotaResponse[]> {
    const url = `${this.baseUrl}/mascotas`;
    return this.http.get<MascotaResponse[]>(url);
  }

}
