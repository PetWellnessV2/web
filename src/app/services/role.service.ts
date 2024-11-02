import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private userRole: 'duenio' | 'veterinario' = 'duenio'; 

  setUserRole(role: 'duenio' | 'veterinario') {
    this.userRole = role;
  }

  getUserRole(): 'duenio' | 'veterinario' {
    return this.userRole;
  }

}