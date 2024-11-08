import { Component, OnInit } from '@angular/core';

interface Recordatorio {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  icon?: string;
}

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.css']
})
export class RecordatoriosComponent implements OnInit {
  reminders: Recordatorio[] = [
    { id: 1, title: 'Vacunación Anual', description: 'Para Firulais', date: '2024-10-10', time: '09:00', type: 'vacunación', icon: 'assets/icons/vacunacion.png' },
    { id: 2, title: 'Consulta de Revisión', description: 'Con Luna', date: '2024-10-15', time: '11:00', type: 'consulta', icon: 'assets/icons/consulta.png' },
  ];

  newReminder: Recordatorio = {
    id: 0,
    title: '',
    description: '',
    date: '',
    time: '',
    type: '',
    icon: ''
  };

  ngOnInit() {
    // Los recordatorios predeterminados ya están cargados en el array 'reminders'
  }

  addReminder() {
    if (this.newReminder.title && this.newReminder.date && this.newReminder.time) {
      const newId = this.reminders.length ? Math.max(...this.reminders.map(r => r.id)) + 1 : 1;

      // Crear un nuevo recordatorio y agregarlo a la lista
      const reminderData: Recordatorio = {
        ...this.newReminder,
        id: newId,
        icon: this.getIcon(this.newReminder.type)  // Asigna el icono según el tipo
      };

      this.reminders.push(reminderData);  // Agregar el nuevo recordatorio al array
      this.resetForm();  // Limpiar el formulario
    }
  }

  deleteReminder(id: number) {
    this.reminders = this.reminders.filter(reminder => reminder.id !== id);  // Eliminar el recordatorio por ID
  }

  resetForm() {
    this.newReminder = {
      id: 0,
      title: '',
      description: '',
      date: '',
      time: '',
      type: '',
      icon: ''
    };
  }

  getIcon(type: string): string {
    switch (type) {
      case 'vacunación': return 'vaccines'; // Ícono para vacunación
      case 'consulta': return 'medical_services'; // Ícono para consulta médica
      case 'alimentación': return 'restaurant'; // Ícono para alimentación
      default: return 'event'; // Ícono predeterminado para otros tipos
    }
  }  
}
