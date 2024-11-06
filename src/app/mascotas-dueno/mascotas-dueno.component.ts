import { Component } from '@angular/core';
import { ConsultasService, MascotaResponse } from '../services/consultas.service';

@Component({
  selector: 'app-mascotas-dueno',
  templateUrl: './mascotas-dueno.component.html',
  styleUrl: './mascotas-dueno.component.css'
})
export class MascotasDuenoComponent {
  mascotas: MascotaResponse[] = [];

  constructor(private consultaService: ConsultasService) {}

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
}
