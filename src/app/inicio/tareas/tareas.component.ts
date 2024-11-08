import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Tarea {
  id: number;
  name: string;
  time: string;
  icon: string;
  linkicon: string;
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  tasksvet: Tarea[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDefaultTareas();
  }

  loadDefaultTareas() {
    const currentRoute = this.router.url;

    if (currentRoute.includes('inicio-dueno')) {
      // Cargar tareas para dueños
      this.tasksvet = [
        { id: 1, name: 'Alimentar a la mascota', time: '08:00 AM', icon: 'assets/icons/food.png', linkicon: 'assets/icons/link.png' },
        { id: 2, name: 'Cita de vacunación', time: '10:00 AM', icon: 'assets/icons/vaccine.png', linkicon: 'assets/icons/link.png' },
        { id: 3, name: 'Paseo con la mascota', time: '12:00 PM', icon: 'assets/icons/walk.png', linkicon: 'assets/icons/link.png' },
        { id: 4, name: 'Cita de control', time: '02:00 PM', icon: 'assets/icons/checkup.png', linkicon: 'assets/icons/link.png' },
        { id: 5, name: 'Limpieza del espacio de la mascota', time: '05:00 PM', icon: 'assets/icons/cleaning.png', linkicon: 'assets/icons/link.png' },
        { id: 6, name: 'Tiempo de juego', time: '07:00 PM', icon: 'assets/icons/play.png', linkicon: 'assets/icons/link.png' }
      ];
    } else if (currentRoute.includes('inicio-vet')) {
      // Cargar tareas para veterinarios
      this.tasksvet = [
        { id: 1, name: 'Consulta con el dueño de Max', time: '09:00 AM', icon: 'assets/icons/consult.png', linkicon: 'assets/icons/link.png' },
        { id: 2, name: 'Revisión de exámenes', time: '11:00 AM', icon: 'assets/icons/exam.png', linkicon: 'assets/icons/link.png' },
        { id: 3, name: 'Cirugía programada', time: '01:00 PM', icon: 'assets/icons/surgery.png', linkicon: 'assets/icons/link.png' },
        { id: 4, name: 'Seguimiento post-operatorio', time: '03:00 PM', icon: 'assets/icons/follow-up.png', linkicon: 'assets/icons/link.png' },
        { id: 5, name: 'Revisión de vacunas', time: '04:30 PM', icon: 'assets/icons/vaccine-check.png', linkicon: 'assets/icons/link.png' },
        { id: 6, name: 'Reunión con el equipo veterinario', time: '06:00 PM', icon: 'assets/icons/team.png', linkicon: 'assets/icons/link.png' }
      ];
    }
  }
}
