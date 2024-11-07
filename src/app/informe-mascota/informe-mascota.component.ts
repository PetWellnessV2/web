import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService, InformeRequest, NotaConsultaResponse } from '../services/consultas.service';

@Component({
  selector: 'app-informe-mascota',
  templateUrl: './informe-mascota.component.html',
  styleUrls: ['./informe-mascota.component.css']
})
export class InformeMascotaComponent implements OnInit {
  mascotaId: number | null = null;
  examenes: InformeRequest[] = [];
  notas: NotaConsultaResponse[] = [];

  constructor(private route: ActivatedRoute, private consultaService: ConsultasService) {}

  ngOnInit(): void {
    // Obtener el ID de la mascota desde la URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('idMascota');
      this.mascotaId = id ? +id : null; // Convertir a número si existe
      
      if (this.mascotaId) {
        this.cargarExamenes();
        this.cargarNotas();
      }
    });
  }

  cargarExamenes(): void {
    if (this.mascotaId) {
      this.consultaService.obtenerExamen(this.mascotaId).subscribe((data: InformeRequest[]) => {
        this.examenes = data;
        console.log('Exámenes:', data);
      });
    }
  }

  cargarNotas(): void {
    if (this.mascotaId) {
      this.consultaService.obtenerNota(this.mascotaId).subscribe((data: NotaConsultaResponse[]) => {
        this.notas = data;
        console.log('Notas:', data);
      });
    }
  }
}