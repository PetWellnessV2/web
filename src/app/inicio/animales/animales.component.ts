import { ConsultasService, MascotaResponse } from './../../services/consultas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {
  mascotasdueno: MascotaResponse[] = [];

  constructor(private ConsultasService: ConsultasService) { }

  ngOnInit() {
    this.loadMascotas();
  }

  loadMascotas() {
    this.ConsultasService.obtenerMascotasUsuario().subscribe((data: MascotaResponse[]) => {
      this.mascotasdueno = data;
    });
  }
}
