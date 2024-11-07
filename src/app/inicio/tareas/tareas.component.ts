import { Component } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { TareasService } from '../services/tareas.service';
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
  styleUrl: './tareas.component.css'
})
export class TareasComponent {
  tasksvet: Tarea[] = [];

  constructor(private TareaService: TareasService) { }

  ngOnInit() {
    this.loadTareas();
  }

  loadTareas() {
    this.TareaService.getTareas().subscribe(data => {
      this.tasksvet = data.map(TareaResponse => ({
        id: TareaResponse.id,
        name: TareaResponse.name,
        time: TareaResponse.time,
        icon: TareaResponse.icon,
        linkicon: TareaResponse.linkicon
      }));
    });
  }
}
