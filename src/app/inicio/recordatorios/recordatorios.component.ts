import { Component, OnInit } from '@angular/core';
import { Recordatorio, RecordatoriosService } from '../services/recordatorios.service';
import { RecordatorioResponse} from '../models/recordatorio-response.model';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.css']
})
export class RecordatoriosComponent implements OnInit {
  reminders: Recordatorio[] = []; // Lista de recordatorios cargados desde el servicio

  newReminder: RecordatorioResponse = {
    title: '',
    description: '',
    date: '',
    time: '',
    type: ''
  };

  constructor(private recordatoriosService: RecordatoriosService) {}

  ngOnInit() {
    this.loadReminders(); 
  }

  loadReminders() {
    this.recordatoriosService.obtenerRecordatorios().subscribe(
      (reminders) => {
        this.reminders = reminders;
      },
      (error) => console.error('Error al cargar recordatorios:', error)
    );
  }

  addReminder() {
    if (this.newReminder.title && this.newReminder.date && this.newReminder.time) {
      const reminderData: RecordatorioResponse = {
        title: this.newReminder.title,
        description: this.newReminder.description,
        date: this.newReminder.date,
        time: this.newReminder.time,
        type: this.newReminder.type
      };

      this.recordatoriosService.addRecordatorio(reminderData).subscribe(
        () => {
          console.log('Recordatorio añadido');
          this.loadReminders(); 
          this.resetForm(); 
        },
        (error) => console.error('Error al añadir recordatorio:', error)
      );
    }
  }

  deleteReminder(id: number) {
    this.recordatoriosService.eliminarRecordatorio(id).subscribe(
      () => {
        this.loadReminders(); 
      },
      (error) => console.error('Error al eliminar recordatorio:', error)
    );
  }

  resetForm() {
    this.newReminder = {
      title: '',
      description: '',
      date: '',
      time: '',
      type: ''
    };
  }
}
