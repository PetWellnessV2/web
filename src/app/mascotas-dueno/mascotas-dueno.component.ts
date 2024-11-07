import {Component, OnInit} from '@angular/core';
import { ConsultasService, MascotaResponse } from '../services/consultas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascotas-dueno',
  templateUrl: './mascotas-dueno.component.html',
  styleUrl: './mascotas-dueno.component.css'
})
export class MascotasDuenoComponent implements OnInit{
  mascotas: MascotaResponse[] = [];

  constructor(private consultaService: ConsultasService, private router: Router) {}

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.consultaService.obtenerMascotasDetalle().subscribe((data: MascotaResponse[]) => {
      this.mascotas = data;
      console.log(data);
    });
  }

  eliminarMascota(id: number): void {
    if (!id) {
        console.error("ID de la mascota no está definido");
        return;
    }
    this.consultaService.eliminarMasota(id).subscribe(() => {
        this.mascotas = this.mascotas.filter(mascotas => mascotas.idMascota !== id);
    }, error => {
        console.error("Error eliminando la mascota:", error);
    });
}
verRegistroSalud(idMascota: number): void {
  // Redirige al componente de informe con el ID de la mascota en la URL
  this.router.navigate(['/informe-mascota', idMascota]);
}
}
