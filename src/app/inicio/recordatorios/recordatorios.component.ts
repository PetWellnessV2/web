import { Component, OnInit } from '@angular/core';
import { RecordatoriosService } from '../services/recordatorios.service';
import { RecordatorioResponse } from '../models/recordatorio-response.model';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrl: './recordatorios.component.css'
})
export class RecordatoriosComponent implements OnInit {
  reminders: any[] = []; // Lista de recordatorios cargados desde el servicio

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
      const reminderData = {
        titulo: this.newReminder.title,
        descripcion: this.newReminder.description,
        fechaHora: `${this.newReminder.date}T${this.newReminder.time}`,
        tipoRecordatorio: this.newReminder.type.toUpperCase(),
        recordatorioStatus: 'PENDIENTE' // Estado inicial
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

  deleteReminder(reminder: any) {
    this.recordatoriosService.eliminarRecordatorio(reminder.id).subscribe(
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
