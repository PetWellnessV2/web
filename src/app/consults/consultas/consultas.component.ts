import { Component, OnInit } from '@angular/core';
import { ConsultasService, Horario, Mascota, ReservaRequest } from '../../services/consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  mascotas: Mascota[] = [];
  horarios: Horario[] = [];
  selectedMascotaId: number | null = null;
  selectedHorarioId: number | null = null;
  tipoConsulta: string = '';
  razonConsulta: string = '';

  // Variables del calendario
  daysAndDates: { day: string; date: number; fullDate: Date }[] = [];
  activeIndex: number = 0;
  currentMonth: string = '';
  currentYear: number = 0;
  currentStartDate: Date = new Date();
  showMonthDropdown: boolean = false;
  showYearDropdown: boolean = false;
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = [];
  fechaSeleccionada: Date | null = null;

  constructor(private consultaService: ConsultasService) {
    this.initializeCalendar(new Date());
    this.populateYears();
  }

  ngOnInit(): void {
    this.cargarMascotas();
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showMonthDropdown = false;
      this.showYearDropdown = false;
    }
  }

  cargarMascotas(): void {
    this.consultaService.obtenerMascotasDetalle().subscribe((data: Mascota[]) => {
      this.mascotas = data;
    });
  }

  cargarHorarios(): void {
    if (this.fechaSeleccionada) {
      const fechaString = this.fechaSeleccionada.toISOString().split('T')[0];
      console.log("Fecha seleccionada para cargar horarios:", fechaString);
      this.consultaService.obtenerHorarios().subscribe((data: Horario[]) => {
        this.horarios = data.filter(horario => horario.fecha === fechaString);
        console.log("Horarios disponibles para la fecha seleccionada:", this.horarios);
      });
    } else {
      console.log("No se ha seleccionado una fecha.");
    }
  }

  seleccionarHorario(horarioId: number): void {
    this.selectedHorarioId = horarioId;
    console.log("Horario seleccionado:", horarioId);
  }

  registrarConsulta(): void {
    if (this.selectedMascotaId && this.selectedHorarioId) {
      const reserva: ReservaRequest = {
        idMascota: this.selectedMascotaId,
        idHorario: this.selectedHorarioId,
        tipoConsulta: this.tipoConsulta,
        razonConsulta: this.razonConsulta,
        estadoConsulta: 'PENDIENTE'
      };
      console.log("Datos de la consulta a registrar:", reserva);
      this.consultaService.registrarReserva(reserva).subscribe(() => {
        alert('Consulta registrada con éxito');
        this.horarios = this.horarios.filter(horario => horario.idHorario !== this.selectedHorarioId);
        this.resetFormulario();
      }, error => {
        console.error('Error al registrar la consulta:', error);
      });
    } else {
      alert('Por favor, seleccione una mascota y un horario');
    }
  }

  resetFormulario(): void {
    this.selectedMascotaId = null;
    this.selectedHorarioId = null;
    this.tipoConsulta = '';
    this.razonConsulta = '';
    this.fechaSeleccionada = null;
  }

  initializeCalendar(startDate: Date): void {
    this.currentStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    this.currentMonth = this.months[this.currentStartDate.getMonth()];
    this.currentYear = this.currentStartDate.getFullYear();
    this.generateDays();
    this.setDefaultActiveDay();
  }

  toggleMonthDropdown(): void {
    this.showMonthDropdown = !this.showMonthDropdown;
    if (this.showMonthDropdown) {
      this.showYearDropdown = false;
    }
  }

  toggleYearDropdown(): void {
    this.showYearDropdown = !this.showYearDropdown;
    if (this.showYearDropdown) {
      this.showMonthDropdown = false;
    }
  }

  selectMonth(monthIndex: number): void {
    const date = new Date(this.currentYear, monthIndex, 1);
    this.initializeCalendar(date);
    this.showMonthDropdown = false;
  }

  selectYear(year: number): void {
    const date = new Date(year, this.months.indexOf(this.currentMonth), 1);
    this.initializeCalendar(date);
    this.showYearDropdown = false;
  }

  populateYears(): void {
    const startYear = 2010;
    const endYear = new Date().getFullYear() + 10;
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  private generateDays(): void {
    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    this.daysAndDates = Array.from({ length: 14 }, (_, i) => {
      const date = new Date(this.currentStartDate);
      date.setDate(this.currentStartDate.getDate() + i);
      return {
        day: daysOfWeek[date.getDay()],
        date: date.getDate(),
        fullDate: date
      };
    });
  }

  private setDefaultActiveDay(): void {
    this.activeIndex = 0;
    this.fechaSeleccionada = this.daysAndDates[this.activeIndex].fullDate;
    this.cargarHorarios();
  }

  setActiveDay(index: number): void {
    this.activeIndex = index;
    this.fechaSeleccionada = this.daysAndDates[index].fullDate;
    this.cargarHorarios();
  }

  prev(): void {
    const newStartDate = new Date(this.currentStartDate);
    newStartDate.setDate(this.currentStartDate.getDate() - 14);
    this.initializeCalendar(newStartDate);
  }

  next(): void {
    const newStartDate = new Date(this.currentStartDate);
    newStartDate.setDate(this.currentStartDate.getDate() + 14);
    this.initializeCalendar(newStartDate);
  }
}
