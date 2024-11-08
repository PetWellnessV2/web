import { ConsultasService, MascotaResponse } from './../../services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface Recordatorio {
  id: number;
  title: string;
  description: string;
  date: string; // formato YYYY-MM-DD
  time: string; // formato HH:mm
  type: string;
  status: string;
  icon?: string;
}

@Component({
  selector: 'app-inicio-dueno',
  templateUrl: './inicio-dueno.component.html',
  styleUrls: ['./inicio-dueno.component.css']
})
export class InicioDuenoComponent implements OnInit {
  daysAndDates: { day: string; date: number; fullDate: Date }[] = [];
  activeIndex: number = 0;
  currentMonth: string = '';
  currentYear: number = 0;
  currentStartDate: Date = new Date();
  showMonthDropdown: boolean = false; 
  showYearDropdown: boolean = false;
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  years: number[] = [];
  recordatorios: Recordatorio[] = [
    { id: 1, title: 'Vacunación Anual', description: 'Para Firulais', date: '2024-11-07', time: '09:00', type: 'vacunación', status: 'CREADO' },
    { id: 2, title: 'Consulta de Revisión', description: 'Con Luna', date: '2024-11-07', time: '11:00', type: 'consulta', status: 'EN_PROCESO' },
    { id: 3, title: 'Alimentación Especial', description: 'Para Chewbacca', date: '2024-11-08', time: '08:00', type: 'alimentación', status: 'CREADO' }
  ];
  filteredRecordatorios: Recordatorio[] = [];  
  mascotas: MascotaResponse[] = [];
  
  constructor(
    public dialog: MatDialog, 
    private router: Router, 
    private consultasService : ConsultasService
  ) {
    this.initializeCalendar(new Date());
    this.populateYears();
  }

  ngOnInit() {
    this.filterRecordatoriosByDate(this.currentStartDate);
    this.cargarMascotas();
  }
  
  cargarMascotas(): void {
    this.consultasService.obtenerMascotasDetalle().subscribe((data: MascotaResponse[]) => {
      this.mascotas = data;
      console.log(data);
    });
  }

  filterRecordatoriosByDate(date: Date): void {
    const selectedDate = date.toISOString().split('T')[0]; 
    this.filteredRecordatorios = this.recordatorios
      .filter(recordatorio => recordatorio.date === selectedDate)
      .sort((a, b) => a.time.localeCompare(b.time)); 
  }

  deleteReminder(id: number): void {
    this.recordatorios = this.recordatorios.filter(recordatorio => recordatorio.id !== id);
    this.filterRecordatoriosByDate(this.daysAndDates[this.activeIndex].fullDate);
  }

  initializeCalendar(startDate: Date): void {
    this.currentStartDate = new Date(startDate);
    this.currentMonth = this.months[startDate.getMonth()];
    this.currentYear = startDate.getFullYear();
    this.generateWeek(startDate);
    this.setDefaultActiveDay();
    this.filterRecordatoriosByDate(this.daysAndDates[this.activeIndex].fullDate); 
  }

  toggleMonthDropdown(): void {
    this.showMonthDropdown = !this.showMonthDropdown;
    this.showYearDropdown = false;
  }

  toggleYearDropdown(): void {
    this.showYearDropdown = !this.showYearDropdown;
    this.showMonthDropdown = false;
  }

  selectMonth(monthIndex: number): void {
    this.showMonthDropdown = false;
    const date = new Date(this.currentYear, monthIndex, 1);
    this.initializeCalendar(date);
  }

  selectYear(year: number): void {
    this.showYearDropdown = false;
    const date = new Date(year, this.months.indexOf(this.currentMonth), 1);
    this.initializeCalendar(date);
  }

  populateYears(): void {
    const startYear = 2010;
    const endYear = new Date().getFullYear() + 10;
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  private generateWeek(startDate: Date): void {
    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    this.daysAndDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return {
        day: daysOfWeek[date.getDay()],
        date: date.getDate(),
        fullDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()) 
      };
    });
  }

  private setDefaultActiveDay(): void {
    this.activeIndex = 0;
    this.filterRecordatoriosByDate(this.daysAndDates[this.activeIndex].fullDate); 
  }

  setActiveDay(index: number): void {
    this.activeIndex = index;
    const selectedDate = this.daysAndDates[index].fullDate;
    this.filterRecordatoriosByDate(selectedDate); 
  }

  prev(): void {
    const newStartDate = new Date(this.currentStartDate);
    newStartDate.setDate(this.currentStartDate.getDate() - 7);
    this.initializeCalendar(newStartDate);
  }

  next(): void {
    const newStartDate = new Date(this.currentStartDate);
    newStartDate.setDate(this.currentStartDate.getDate() + 7);
    this.initializeCalendar(newStartDate);
  }

  goToAddReminder() {
    this.router.navigate(['/add-reminder']);
  }
  getIcon(type: string): string {
    switch (type) {
      case 'vacunación': return 'vaccines'; // Icono de vacunación
      case 'consulta': return 'medical_services'; // Icono de consulta
      case 'alimentación': return 'restaurant'; // Icono de alimentación
      default: return 'event'; // Icono predeterminado
    }
  }
  
}
