import { Component } from '@angular/core';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrl: './recordatorios.component.css'
})
export class RecordatoriosComponent {
  reminders = [
    {
      title: 'Consulta',
      description: 'con Dr. Jose',
      time: '09:20 AM - 11:30 AM',
      icon: 'assets/consulta-icon.png'
    },
    {
      title: 'Vacunación anti-rabica',
      description: 'con Dra. Mirella',
      time: '11:30 AM - 11:50 PM',
      icon: 'assets/vacunacion-icon.png'
    },
    {
      title: 'Comprar comida B.A.R.F',
      description: 'en Metro',
      time: '3:00 PM - 4:00 PM',
      icon: 'assets/comida-icon.png'
    },
    {
      title: 'Revisión de resultados',
      description: 'con Dr. Jose',
      time: '4:30 PM - 5:15 PM',
      icon: 'assets/revision-icon.png'
    },
    {
      title: 'MRI Results',
      description: 'with Carl Friedemann',
      time: '12:20 AM - 1:30 AM',
      icon: 'assets/mri-icon.png'
    }
  ];

  newReminder = {
    title: '',
    description: '',
    date: '',
    time: '',
    type: ''
  };

  // Add a new reminder to the list
  addReminder() {
    if (this.newReminder.title && this.newReminder.date && this.newReminder.time) {
      this.reminders.push({
        ...this.newReminder,
        icon: 'assets/default-icon.png' // Default icon for new reminders
      });

      // Clear form fields
      this.newReminder = {
        title: '',
        description: '',
        date: '',
        time: '',
        type: ''
      };
    }
  }

  // Delete a reminder from the list
  deleteReminder(reminder: any) {
    this.reminders = this.reminders.filter(r => r !== reminder);
  }
}
