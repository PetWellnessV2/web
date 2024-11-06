import { Component, OnInit } from '@angular/core';
import { ConsultasService, InformeRequest, Mascota, NotaConsultaRequest } from '../../services/consultas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.css'
})
export class InformeComponent implements OnInit {
  mascotas: Mascota[] = [];
  selectedMascotaId: number | null = null;
  razonConsulta: string | null = null;
  presionArterial: number | null = null;
  pulso: number | null = null;
  temperatura: number | null = null;
  peso: number | null = null;
  altura: number | null = null;

  constructor(private consultaService: ConsultasService, private router: Router) {}

  cargarMascotas(): void {
    this.consultaService.obtenerMascotas().subscribe((data: Mascota[]) => {
        this.mascotas = data;
        console.log(this.mascotas);
    });
  }

  ngOnInit(): void {
    this.cargarMascotas();
  }

  registrarInforme(): void {
    if (this.selectedMascotaId && this.presionArterial && this.pulso && this.temperatura && this.peso && this.altura && this.razonConsulta) {
      const informe: InformeRequest = {
        idMascota: this.selectedMascotaId,
        presionArterial: this.presionArterial,
        pulso: this.pulso,
        temperatura: this.temperatura,
        peso: this.peso,
        altura: this.altura

      };
      const nota: NotaConsultaRequest = {
        idMascota: this.selectedMascotaId,
        descripcion: this.razonConsulta
      }
      this.consultaService.registrarInforme(informe).subscribe(() => {
        this.consultaService.registrarNotaConsulta(nota).subscribe();
        alert('Informe registrado con éxito');
        this.resetFormulario();
        this.router.navigate(['/consults/consultas-vet']);
    }, error => {
        console.error("Error al registrar el informe:", error);
    });
    }else{
      alert('Por favor, complete todos los campos');
    }
    
  }

  resetFormulario(): void {
    this.selectedMascotaId = null;
    this.presionArterial = null;
    this.pulso = null;
    this.temperatura = null;
    this.peso = null;
    this.altura = null;
    this.razonConsulta = null; 
}
}
