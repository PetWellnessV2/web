import { Component, OnInit } from '@angular/core';
import { ConsultasService, Horario, Mascota, ReservaRequest } from '../../services/consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent implements OnInit {
  mascotas: Mascota[] = [];
    horarios: Horario[] = [];
    selectedMascotaId: number | null = null;
    selectedHorarioId: number | null = null;
    tipoConsulta: string = '';
    razonConsulta: string = '';

    constructor(private consultaService: ConsultasService) {}

    ngOnInit(): void {
        this.cargarMascotas();
        this.cargarHorarios();
    }

    cargarMascotas(): void {
        this.consultaService.obtenerMascotas().subscribe((data: Mascota[]) => {
            this.mascotas = data;
            console.log(this.mascotas);
        });
    }

    cargarHorarios(): void {
        this.consultaService.obtenerHorarios().subscribe((data: Horario[]) => {
            this.horarios = data;
        });
    }

    seleccionarHorario(horarioId: number): void {
        this.selectedHorarioId = horarioId;
    }

    registrarConsulta(): void {
      console.log('Selected Mascota ID:', this.selectedMascotaId);
      console.log('Selected Horario ID:', this.selectedHorarioId);
  
      if (this.selectedMascotaId && this.selectedHorarioId) {
          const reserva: ReservaRequest = {
              idMascota: this.selectedMascotaId,
              idHorario: this.selectedHorarioId,
              tipoConsulta: this.tipoConsulta,
              razonConsulta: this.razonConsulta,
              estadoConsulta: "PENDIENTE"
          };
          this.consultaService.registrarReserva(reserva).subscribe(() => {
              alert('Consulta registrada con éxito');
              this.resetFormulario();
          }, error => {
              console.error("Error al registrar la consulta:", error);
          });
      } else {
          alert('Por favor, seleccione una mascota y un horario');
      }
    } 

    resetFormulario(): void {
        this.selectedMascotaId = null;
        this.selectedHorarioId = null;
        this.tipoConsulta = '';
        this.razonConsulta = '';
    }

}
