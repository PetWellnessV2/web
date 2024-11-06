import { MascotaResponse } from '../models/mascota-response.model';
import { MascotasService } from '../services/mascotas.service';
import { Component } from '@angular/core';
interface Mascotas {
  img: string;
  nombre: string;
  fecha: string;
  hora: string;
}
@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrl: './animales.component.css'
})
export class AnimalesComponent {
  mascotasdueno: Mascotas[] = [];

  constructor(private MascotasService: MascotasService) { }

  ngOnInit() {
    this.loadConsultas();
  }

  loadConsultas() {
    this.MascotasService.getCMascotas().subscribe(data => {
      this.mascotasdueno = data.map(MascotaResponse => ({
        img: MascotaResponse.img,
        nombre: MascotaResponse.nombre,
        fecha: MascotaResponse.fecha,
        hora: MascotaResponse.hora
      }));
    });
  }
}
