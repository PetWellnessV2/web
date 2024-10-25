import { RegisterRequest } from './../models/register-request.model';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { AuthRequest } from '../models/auth-request.model';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  constructor() { }

  login(authRequest: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(tap(response => this.storageService.sethAuthData(response)));
  }

  register_customer(registerRequest: RegisterRequest): Observable<RegisterRequest>{
    return this.http.post<RegisterRequest>(`${this.baseURL}/register/customer`, registerRequest);
  }

  logout() : void {
    this.storageService.clearAuthData();
  }

  isAuthenticated() : boolean {
    return this.storageService.getAuthData !== null;
  }

  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }
}