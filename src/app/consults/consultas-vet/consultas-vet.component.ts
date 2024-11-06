import { Component, OnInit } from '@angular/core';
import { ConsultasService, Horario, Mascota, ReservaRequest } from '../../services/consultas.service';

@Component({
  selector: 'app-consultas-vet',
  templateUrl: './consultas-vet.component.html',
  styleUrls: ['./consultas-vet.component.css']
})
export class ConsultasVetComponent implements OnInit {
  horarioId: number = 4;
  mascotas: Mascota[] = [];
  horarios: Horario[] = [];
  selectedMascotaId: number | null = null;
  selectedHorarioId: number | null = null;
  tipoConsulta: string = '';
  razonConsulta: string = '';

  constructor(private consultaService: ConsultasService) {}

  ngOnInit(): void {
      this.cargarMascotas();
      //this.cargarHorarios();
      this.cargarHorarios1(this.horarioId);
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
        console.log(this.horarios); 
    });
}
  cargarHorarios1(id: number): void {
      this.consultaService.obtenerHorariosVet(id).subscribe((data: Horario[]) => {
          this.horarios = data;
          console.log(this.horarios); 
      });
  }


  seleccionarHorario(horarioId: number): void {
      this.selectedHorarioId = horarioId;
  }

  registrarConsulta(): void {
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
            
            // Elimina el horario seleccionado de la lista de horarios disponibles
            this.horarios = this.horarios.filter(horario => horario.idHorario !== this.selectedHorarioId);

            // Resetea el formulario
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
