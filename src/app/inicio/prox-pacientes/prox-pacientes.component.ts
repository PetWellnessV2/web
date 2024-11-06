import { Component } from '@angular/core';

@Component({
  selector: 'app-prox-pacientes',
  templateUrl: './prox-pacientes.component.html',
  styleUrl: './prox-pacientes.component.css'
})
export class ProxPacientesComponent {
  selectedTab: string = 'resumen';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
