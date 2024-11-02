import { Component } from '@angular/core';

@Component({
  selector: 'app-prox-consultas',
  templateUrl: './prox-consultas.component.html',
  styleUrl: './prox-consultas.component.css'
})
export class ProxConsultasComponent {
  selectedTab: string = 'resumen';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}
