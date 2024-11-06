import { Component, OnInit } from '@angular/core';
import { Consulta, ConsultasService, InformeRequest, NotaConsultaRequest, NotaConsultaResponse } from '../services/consultas.service';

@Component({
  selector: 'app-informe-mascota',
  templateUrl: './informe-mascota.component.html',
  styleUrl: './informe-mascota.component.css'
})
export class InformeMascotaComponent implements OnInit {
  mascotaId: number = 1;
  examenes: InformeRequest[] = [];
  notas: NotaConsultaResponse[] = [];

  constructor(private consultaService: ConsultasService) {}

  ngOnInit(): void {
    this.cargarExamenes();
    this.cargarNotas();
  }

  cargarExamenes(): void {
    this.consultaService.obtenerExamen(this.mascotaId).subscribe((data: InformeRequest[]) => {
      this.examenes = data;
      console.log('Examenes:', data);
    });
  }

  cargarNotas(): void {
    this.consultaService.obtenerNota(this.mascotaId).subscribe((data: NotaConsultaResponse[]) => {
      this.notas = data;
      console.log('Notas:', data);
    });
  }
}
