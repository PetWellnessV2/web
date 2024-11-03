import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecordatoriosComponent } from '../recordatorios/recordatorios.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-dueno',
  templateUrl: './inicio-dueno.component.html',
  styleUrl: './inicio-dueno.component.css'
})
export class InicioDuenoComponent {
  daysAndDates: { day: string; date: number }[] = [];
  activeIndex: number = 0;
  currentMonth: string = '';
  currentYear: number = 0;
  showMonthDropdown: boolean = false; // To show/hide the month dropdown
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public dialog: MatDialog, private router: Router) {
    this.initializeCalendar();
  }

  initializeCalendar(month: number = new Date().getMonth(), year: number = new Date().getFullYear()): void {
    const today = new Date();
    const startOfWeek = this.getStartOfWeek(today); // Calculate Monday of the current week

    this.currentMonth = today.toLocaleString('default', { month: 'long' });
    this.currentYear = today.getFullYear();

    // Generate the current week's days and dates
    this.daysAndDates = this.generateWeek(startOfWeek);
  }

  // Toggle the visibility of the month dropdown
  toggleDropdown(): void {
    this.showMonthDropdown = !this.showMonthDropdown;
  }

  // Select a month from the dropdown and update the calendar
  selectMonth(monthIndex: number): void {
    this.showMonthDropdown = false; // Hide dropdown
    this.initializeCalendar(monthIndex, this.currentYear); // Update calendar for the selected month
  }

  // Helper method to calculate the Monday of the given week
  private getStartOfWeek(date: Date): Date {
    const dayOfWeek = (date.getDay() + 6) % 7;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    return startOfWeek;
  }

  // Helper method to generate a week's days and dates starting from a specific date
  private generateWeek(startDate: Date): { day: string; date: number }[] {
    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return {
        day: daysOfWeek[i],
        date: date.getDate(),
      };
    });
  }

  // Shift the displayed week by a specified offset in weeks
  private shiftWeek(offset: number): void {
    const currentStartDate = this.getStartOfWeek(new Date(this.currentYear, this.months.indexOf(this.currentMonth), this.daysAndDates[0].date));
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(currentStartDate.getDate() + offset * 7);

    this.daysAndDates = this.generateWeek(newStartDate);
    this.currentMonth = newStartDate.toLocaleString('default', { month: 'long' });
    this.currentYear = newStartDate.getFullYear();
  }

  prev(): void {
    this.shiftWeek(-1);
  }

  next(): void {
    this.shiftWeek(1);
  }

  appointments = [
    { id: 1, name: 'Consulta con Dr. Jose', time: '09:20 AM - 11:30 AM', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3WvytFYRjA8eNXGQwUShQDd6AUJUIMNq7xMtjskkyUSaSkmLgJZVNistgsNvEffXS7r5g4x33VTfept+cZzvt+3+fbc04nSWpRDYFhNGIALehGJ9rQh2YMog4jYc9HHv0NsB+beMYJHnGBe9zgGg84xRMO8YIDvIb8hh1Mp4VO4gw57KIXaxjDMhYwi9XQ7RY6cBRMHIdcunAPNrCeBnyOpqB3qaQxs7LyOXOYCPUl6n/aUAx5CCto+CV4HjOh3kd7KnDMwF4a8C0KEdZUmIVx3FV1x8WqAit/QApBXyFtXRHY52uxiHyWulJw7svAZKozg2VUGk21jEqjqVaB3ppq/1J18v2Ze3811eMxwbkMSruigWNGWvBVVGr5zCO0/vRQPvx3FSOu7djN1CJJG++5NFwDQjfIuQAAAABJRU5ErkJggg==' },
    { id: 2, name: 'Vacunación anti-rabica con Dra. Mirella', time: '11:30 AM - 11:50 PM', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3WvytFYRjA8eNXGQwUShQDd6AUJUIMNq7xMtjskkyUSaSkmLgJZVNistgsNvEffXS7r5g4x33VTfept+cZzvt+3+fbc04nSWpRDYFhNGIALehGJ9rQh2YMog4jYc9HHv0NsB+beMYJHnGBe9zgGg84xRMO8YIDvIb8hh1Mp4VO4gw57KIXaxjDMhYwi9XQ7RY6cBRMHIdcunAPNrCeBnyOpqB3qaQxs7LyOXOYCPUl6n/aUAx5CCto+CV4HjOh3kd7KnDMwF4a8C0KEdZUmIVx3FV1x8WqAit/QApBXyFtXRHY52uxiHyWulJw7svAZKozg2VUGk21jEqjqVaB3ppq/1J18v2Ze3811eMxwbkMSruigWNGWvBVVGr5zCO0/vRQPvx3FSOu7djN1CJJG++5NFwDQjfIuQAAAABJRU5ErkJggg==' },
    { id: 3, name: 'Comprar comida B.A.R.F en Metro', time: '03:00 PM - 04:00 PM', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIUlEQVR4nNWXO04DMRRFBylLoE9NRTGiTJs0oaCBhjZTsgEEu0iRJihiMxSjKWcJUFCmS3MiRzayHH8m5ongK13J8vN9R/OzNVX13wU8AB9AG7Cq3f8GcAssgZXjL+AdaAJWtU9PTvWap6A3wA7YeBp8K0Ak2+g1bm6je9Yx8ALo9Lh23A8A925O1zrVu0qEWz32KQU+kq61sawP/HN7gDfSWlvraynwCLj2PAJjVRuJg09V2WDCm8azlb0z85LgJuCJlb0y82LgHEldcR3w2MpeOpuGCDiklZM9SAyco7LBHJ84xo9WdmLmywfnqGww5/qcONcGkqNiwX3kSEy5zwU3Eh4KngFb4EkKrHttgWkMfAG8Jn5VTrXq9TLszfgD7QE3ju7Op6uo/gAAAABJRU5ErkJggg==' },
    { id: 4, name: 'Revisión de resultados con Dr. Jose', time: '04:30 PM - 05:15 PM', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIUlEQVR4nNWXO04DMRRFBylLoE9NRTGiTJs0oaCBhjZTsgEEu0iRJihiMxSjKWcJUFCmS3MiRzayHH8m5ongK13J8vN9R/OzNVX13wU8AB9AG7Cq3f8GcAssgZXjL+AdaAJWtU9PTvWap6A3wA7YeBp8K0Ak2+g1bm6je9Yx8ALo9Lh23A8A925O1zrVu0qEWz32KQU+kq61sawP/HN7gDfSWlvraynwCLj2PAJjVRuJg09V2WDCm8azlb0z85LgJuCJlb0y82LgHEldcR3w2MpeOpuGCDiklZM9SAyco7LBHJ84xo9WdmLmywfnqGww5/qcONcGkqNiwX3kSEy5zwU3Eh4KngFb4EkKrHttgWkMfAG8Jn5VTrXq9TLszfgD7QE3ju7Op6uo/gAAAABJRU5ErkJggg==' },
  ];


  goToAddReminder() {
    this.router.navigate(['/add-reminder']);
  }  

  
}
