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
  
  imagenredirec = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJElEQVR4nO2VvWoCQRSFv7G0ij9VniBEm6BYaB4gsTWFSAgY0Cpd8iqCgk8QSC8KAcuIRQi+h0lhlUJZOMIizuzuaBPigVNc5s79uMPevfDflQEega7FD0D6UEgbWEf43lWgArwBc4tvgBRQBEohl4FpCNKxAVrAL/CtC5Mdj4DqnnsG6Kv4xAXJq/gHkE3wdCYE6KtDK+ROh7cJAYMQIIgLLkhHhwUPwEAxx4QYoKf8oT4Ejgkxlg62utBZ2xdiIgCoq2BQz3whTxGAmubIqjiQS4H2AdAcfR0KidIYWLgSTpBEz7X9fV/hrynw6Uq4FuTZE5ADfoBXV1IwRO/ACnjRXinFdB2YaU0EsVPnAq09vASacds2ejrXDu/uuJFwB/1RbQAq/nUqTc80IgAAAABJRU5ErkJggg=='
  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDefaultTareas();
  }

  loadDefaultTareas() {
    const currentRoute = this.router.url;

    if (currentRoute.includes('inicio-dueno')) {
      this.tasksvet = [
        { id: 1, name: 'Alimentar a la mascota', time: '08:00 AM', icon: 'fastfood', linkicon: this.imagenredirec },
        { id: 2, name: 'Cita de vacunación', time: '10:00 AM', icon: 'medical_services', linkicon: this.imagenredirec },
        { id: 3, name: 'Paseo con la mascota', time: '12:00 PM', icon: 'directions_walk', linkicon: this.imagenredirec },
        { id: 4, name: 'Cita de control', time: '02:00 PM', icon: 'check_circle', linkicon: this.imagenredirec },
        { id: 5, name: 'Limpieza del espacio de la mascota', time: '05:00 PM', icon: 'cleaning_services', linkicon: this.imagenredirec },
        { id: 6, name: 'Tiempo de juego', time: '07:00 PM', icon: 'sports_soccer', linkicon: this.imagenredirec }
      ];
    } else if (currentRoute.includes('inicio-vet')) {
      this.tasksvet = [
        { id: 1, name: 'Consulta con el dueño de Max', time: '09:00 AM', icon: 'assignment', linkicon: this.imagenredirec },
        { id: 2, name: 'Revisión de exámenes', time: '11:00 AM', icon: 'assignment_turned_in', linkicon: this.imagenredirec },
        { id: 3, name: 'Cirugía programada', time: '01:00 PM', icon: 'local_hospital', linkicon: this.imagenredirec },
        { id: 4, name: 'Seguimiento post-operatorio', time: '03:00 PM', icon: 'verified_user', linkicon: this.imagenredirec },
        { id: 5, name: 'Revisión de vacunas', time: '04:30 PM', icon: 'vaccines', linkicon: this.imagenredirec },
        { id: 6, name: 'Reunión con el equipo veterinario', time: '06:00 PM', icon: 'group', linkicon: this.imagenredirec }
      ];
    }
  }

}
