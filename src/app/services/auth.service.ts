import { RegisterRequest } from './../models/register-request.model';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { AuthRequest } from '../models/auth-request.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { RegisterResponse } from '../models/register-response.model';
import { RegisterRequestVet } from '../models/register-vet-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  constructor() { }

  isLoggedIn = this.loggedIn.asObservable();

  login(authRequest: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
      tap(
        response => this.storageService.sethAuthData(response))
    );
  }

  login_() {
    this.loggedIn.next(true);
  }

  logout_() {
    this.loggedIn.next(false);
    localStorage.removeItem('authToken');
  }

  register_customer(registerRequest: RegisterRequest): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.baseURL}/register/customer`, registerRequest);
  }

  register_vet(registerRequestVet: RegisterRequestVet): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.baseURL}/register/vet`, registerRequestVet);
  }

  logout() : void {
    this.storageService.clearAuthData();
  }

  isAuthenticated() : boolean {
    return this.storageService.getAuthData() !== null;
  }

  getUserId(): number | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.id : null;
  }

  getAuthToken(): string | null {
    return this.storageService.getAuthToken();
  }
}