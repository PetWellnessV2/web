import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';
import { MascotaResponse, Consulta } from '../../services/consultas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  mascotas: MascotaResponse[] = [];
  totalPerros: number = 0;
  totalGatos: number = 0;

  consultas: Consulta[] = [];
  consultasPendientes: number = 0;
  consultasCompletadas: number = 0;

  constructor(private consultaService: ConsultasService) {}

  ngOnInit(): void {
    this.cargarMascotas();
    this.cargarConsultas();
  }

  // Cargar las mascotas y calcular las estadísticas de especies
  cargarMascotas(): void {
    this.consultaService.obtenerMascotasDetalle().subscribe((data: MascotaResponse[]) => {
      this.mascotas = data;
      console.log('Mascotas:', data);
      this.calcularEspecies();
    });
  }

  calcularEspecies(): void {
    this.totalPerros = this.mascotas.filter((mascota) => mascota.especie.toUpperCase() === 'PERRO').length;
    this.totalGatos = this.mascotas.filter((mascota) => mascota.especie.toUpperCase() === 'GATO').length;
  }

  // Cargar las consultas y calcular las estadísticas
  cargarConsultas(): void {
    this.consultaService.obtenerConsultas().subscribe((data: Consulta[]) => {
      this.consultas = data;
      console.log('Consultas:', data);
      this.calcularEstadisticas();
    });
  }

  calcularEstadisticas(): void {
    this.consultasPendientes = this.consultas.filter((consulta) => consulta.estadoConsulta === 'PENDIENTE').length;
    this.consultasCompletadas = this.consultas.filter((consulta) => consulta.estadoConsulta === 'COMPLETADO').length;
  }
}
