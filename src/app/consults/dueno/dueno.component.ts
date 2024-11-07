import { Component, OnInit } from '@angular/core';
import { Consulta, ConsultasService, MascotaResponse } from '../../services/consultas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dueno',
  templateUrl: './dueno.component.html',
  styleUrl: './dueno.component.css'
})
export class DuenoComponent implements OnInit {
  consultas: Consulta[] = [];
  mascotas: MascotaResponse[] = [];
  constructor(private consultaService: ConsultasService) {}

  ngOnInit(): void {
    this.cargarConsultas();
  }

  cargarConsultas(): void {
    // Obtener todas las mascotas del usuario logueado
    this.consultaService.obtenerMascotasDetalle().subscribe(
      (mascotas: MascotaResponse[]) => {
        this.mascotas = mascotas;
        
        // Crear un array de observables de consultas para cada mascota
        const consultasObservables = mascotas.map(mascota => 
          this.consultaService.obtenerConsultasPorMascota(mascota.idMascota)
        );

        // Usar forkJoin para ejecutar todas las solicitudes de consultas en paralelo
        forkJoin(consultasObservables).subscribe(
          (consultasArray: Consulta[][]) => {
            // Combinar todas las consultas en un solo array
            this.consultas = consultasArray.flat();
          },
          error => {
            console.error('Error al cargar las consultas de las mascotas:', error);
          }
        );
      },
      error => {
        console.error('Error al cargar las mascotas del usuario:', error);
      }
    );
  }

  eliminarConsulta(id: number): void {
    if (!id) {
        console.error("ID de la consulta no está definido");
        return;
    }
    this.consultaService.eliminarConsulta(id).subscribe(() => {
        this.consultas = this.consultas.filter(consulta => consulta.idConsulta !== id);
    }, error => {
        console.error("Error eliminando la consulta:", error);
    });
}
}
