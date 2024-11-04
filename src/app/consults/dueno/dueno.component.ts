import { Component, OnInit } from '@angular/core';
import { Consulta, ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-dueno',
  templateUrl: './dueno.component.html',
  styleUrl: './dueno.component.css'
})
export class DuenoComponent implements OnInit {
  consultas: Consulta[] = [];

  constructor(private consultaService: ConsultasService) {}

  ngOnInit(): void {
    this.cargarConsultas();
  }

  cargarConsultas(): void {
    this.consultaService.obtenerConsultas().subscribe((data: Consulta[]) => {
      this.consultas = data;
      console.log(data);
    });
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
