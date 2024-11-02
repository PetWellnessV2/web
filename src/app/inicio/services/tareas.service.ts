import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TareaResponse } from '../interfaces/tarea-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private baseUrl: string = environment.baseURL;
  
  private http = inject(HttpClient);

  getTareas()  : Observable<TareaResponse[]> {
    const url = `${this.baseUrl}/tasksvet`;
    return this.http.get<TareaResponse[]>(url);
  }
}
