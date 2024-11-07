import { Component } from '@angular/core';
import { ConsultasService, MascotaRegister } from '../../services/consultas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre: string = '';
  especie: string = '';
  genero: string = '';
  raza: string = '';
  edad: number | null = null;
  fechaNacimiento: string = '';

  especies = ['PERRO', 'GATO', 'CABALLO', 'CONEJO', 'AVE', 'REPTIL', 'ROEDOR'];

  razasPorEspecie: { [key: string]: string[] } = {
      'PERRO': ['LABRADOR', 'BULLDOG', 'PASTOR_ALEMAN', 'BEAGLE', 'CHIHUAHUA'],
      'GATO': ['PERSA', 'SIAMES', 'MAINE_COON', 'BENGALA'],
      'CABALLO': ['ARABE', 'PURA_SANGRE', 'FRISON'],
      'CONEJO': ['ANGORA', 'MINI_LOP'],
      'AVE': ['CANARIO', 'LORO', 'CACATUA'],
      'REPTIL': ['IGUANA', 'GECKO', 'PITON'],
      'ROEDOR': ['COBAYA', 'RATON', 'CHINCHILLA']
  };

  razasDisponibles: string[] = [];

  constructor(private consultasService: ConsultasService, private authService: AuthService) {}

  actualizarRazas(): void {
      this.razasDisponibles = this.razasPorEspecie[this.especie] || [];
  }

  registrarMascota(): void {
    const usuarioId = this.authService.getUserId();
    if (usuarioId === null) {
        return;
      }

      const nuevaMascota: MascotaRegister = {
          usuarioId: usuarioId,
          especie: this.especie,
          raza: this.raza,
          genero: this.genero,
          nombre: this.nombre,
          edad: this.edad || 0,
          fechaNacimiento: this.fechaNacimiento
      };

      // Llamar al servicio para registrar la mascota :)
      this.consultasService.registrarMascota(nuevaMascota).subscribe(
          () => {
              alert('Mascota registrada con éxito');
              this.resetFormulario();
          },
          (error) => {
              console.error("Error al registrar la mascota:", error);
              alert('Ocurrió un error al registrar la mascota');
          }
      );
  }

  resetFormulario(): void {
      this.nombre = '';
      this.especie = '';
      this.genero = '';
      this.raza = '';
      this.edad = null;
      this.fechaNacimiento = '';
      this.razasDisponibles = [];
  }
}
