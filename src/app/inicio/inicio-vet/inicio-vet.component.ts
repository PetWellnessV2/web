import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Recordatorio, RecordatoriosService } from '../services/recordatorios.service';
import { RecordatorioRequest } from '../models/recordatorio.request.model';
import { ConsultasService, MascotaResponse } from '../../services/consultas.service';

@Component({
  selector: 'app-inicio-vet',
  templateUrl: './inicio-vet.component.html',
  styleUrls: ['./inicio-vet.component.css']
})
export class InicioVetComponent implements OnInit {
  daysAndDates: { day: string; date: number; fullDate: Date }[] = [];
  activeIndex: number = 0;
  currentMonth: string = '';
  currentYear: number = 0;
  currentStartDate: Date = new Date();
  showMonthDropdown: boolean = false; 
  showYearDropdown: boolean = false;
  mascotas: MascotaResponse[] = [];
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  years: number[] = [];
  recordatorios: Recordatorio[] = []; 

  constructor(
    public dialog: MatDialog, 
    private router: Router, 
    private recordatoriosService: RecordatoriosService,
    private consultasService: ConsultasService
  ) {
    this.initializeCalendar(new Date());
    this.populateYears();

  }

  ngOnInit() {
    this.loadRecordatorios();
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.consultasService.obtenerMascotas().subscribe((data: MascotaResponse[]) => {
      this.mascotas = data;
      console.log(data);
    });
  }

  loadRecordatorios() {
    this.recordatoriosService.obtenerRecordatorios().subscribe(
      (recordatorios) => this.recordatorios = recordatorios,
      (error) => console.error('Error al cargar recordatorios:', error)
    );
  }

  deleteReminder(id: number) {
    this.recordatoriosService.eliminarRecordatorio(id).subscribe(
      () => this.loadRecordatorios(), // Recarga los recordatorios después de eliminar uno
      (error) => console.error('Error al eliminar recordatorio:', error)
    );
  }

  initializeCalendar(startDate: Date): void {
    this.currentStartDate = new Date(startDate);
    this.currentMonth = this.months[startDate.getMonth()];
    this.currentYear = startDate.getFullYear();
    this.generateWeek(startDate);
    this.setDefaultActiveDay();
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
        fullDate: date
      };
    });
  }

  private setDefaultActiveDay(): void {
    this.activeIndex = 0;
  }

  setActiveDay(index: number): void {
    this.activeIndex = index;
  }

  prev(): void {
    const newStartDate = new Date(this.currentStartDate);
    newStartDate.setDate(this.currentStartDate.getDate() - 1);
    this.initializeCalendar(newStartDate);
  }

  next(): void {
    const newStartDate = new Date(this.currentStartDate);
    newStartDate.setDate(this.currentStartDate.getDate() + 1);
    this.initializeCalendar(newStartDate);
  }

  goToAddReminder() {
    this.router.navigate(['/add-reminder']);
  }

}
