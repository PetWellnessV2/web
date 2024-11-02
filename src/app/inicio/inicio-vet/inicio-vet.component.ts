import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecordatoriosComponent } from '../recordatorios/recordatorios.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inicio-vet',
  templateUrl: './inicio-vet.component.html',
  styleUrl: './inicio-vet.component.css'
})
export class InicioVetComponent {
  days: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  dates: number[] = [9, 10, 11, 12, 13, 14];
  activeIndex: number = 2;
  selectedTab: string = 'resumen';
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public dialog: MatDialog) {}

  prev(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.dates.length - 1;
    }
  }

  next(): void {
    if (this.activeIndex < this.dates.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
    }
  }

  appointments = [
    { id: 1, name: 'Consulta con Dr. Jose', time: '09:20 AM - 11:30 AM', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3WvytFYRjA8eNXGQwUShQDd6AUJUIMNq7xMtjskkyUSaSkmLgJZVNistgsNvEffXS7r5g4x33VTfept+cZzvt+3+fbc04nSWpRDYFhNGIALehGJ9rQh2YMog4jYc9HHv0NsB+beMYJHnGBe9zgGg84xRMO8YIDvIb8hh1Mp4VO4gw57KIXaxjDMhYwi9XQ7RY6cBRMHIdcunAPNrCeBnyOpqB3qaQxs7LyOXOYCPUl6n/aUAx5CCto+CV4HjOh3kd7KnDMwF4a8C0KEdZUmIVx3FV1x8WqAit/QApBXyFtXRHY52uxiHyWulJw7svAZKozg2VUGk21jEqjqVaB3ppq/1J18v2Ze3811eMxwbkMSruigWNGWvBVVGr5zCO0/vRQPvx3FSOu7djN1CJJG++5NFwDQjfIuQAAAABJRU5ErkJggg==' },
    { id: 2, name: 'Vacunación anti-rabica con Dra. Mirella', time: '11:30 AM - 11:50 PM', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3WvytFYRjA8eNXGQwUShQDd6AUJUIMNq7xMtjskkyUSaSkmLgJZVNistgsNvEffXS7r5g4x33VTfept+cZzvt+3+fbc04nSWpRDYFhNGIALehGJ9rQh2YMog4jYc9HHv0NsB+beMYJHnGBe9zgGg84xRMO8YIDvIb8hh1Mp4VO4gw57KIXaxjDMhYwi9XQ7RY6cBRMHIdcunAPNrCeBnyOpqB3qaQxs7LyOXOYCPUl6n/aUAx5CCto+CV4HjOh3kd7KnDMwF4a8C0KEdZUmIVx3FV1x8WqAit/QApBXyFtXRHY52uxiHyWulJw7svAZKozg2VUGk21jEqjqVaB3ppq/1J18v2Ze3811eMxwbkMSruigWNGWvBVVGr5zCO0/vRQPvx3FSOu7djN1CJJG++5NFwDQjfIuQAAAABJRU5ErkJggg==' },
    { id: 3, name: 'Comprar comida B.A.R.F en Metro', time: '03:00 PM - 04:00 PM', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIUlEQVR4nNWXO04DMRRFBylLoE9NRTGiTJs0oaCBhjZTsgEEu0iRJihiMxSjKWcJUFCmS3MiRzayHH8m5ongK13J8vN9R/OzNVX13wU8AB9AG7Cq3f8GcAssgZXjL+AdaAJWtU9PTvWap6A3wA7YeBp8K0Ak2+g1bm6je9Yx8ALo9Lh23A8A925O1zrVu0qEWz32KQU+kq61sawP/HN7gDfSWlvraynwCLj2PAJjVRuJg09V2WDCm8azlb0z85LgJuCJlb0y82LgHEldcR3w2MpeOpuGCDiklZM9SAyco7LBHJ84xo9WdmLmywfnqGww5/qcONcGkqNiwX3kSEy5zwU3Eh4KngFb4EkKrHttgWkMfAG8Jn5VTrXq9TLszfgD7QE3ju7Op6uo/gAAAABJRU5ErkJggg==' },
    { id: 4, name: 'Revisión de resultados con Dr. Jose', time: '04:30 PM - 05:15 PM', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIUlEQVR4nNWXO04DMRRFBylLoE9NRTGiTJs0oaCBhjZTsgEEu0iRJihiMxSjKWcJUFCmS3MiRzayHH8m5ongK13J8vN9R/OzNVX13wU8AB9AG7Cq3f8GcAssgZXjL+AdaAJWtU9PTvWap6A3wA7YeBp8K0Ak2+g1bm6je9Yx8ALo9Lh23A8A925O1zrVu0qEWz32KQU+kq61sawP/HN7gDfSWlvraynwCLj2PAJjVRuJg09V2WDCm8azlb0z85LgJuCJlb0y82LgHEldcR3w2MpeOpuGCDiklZM9SAyco7LBHJ84xo9WdmLmywfnqGww5/qcONcGkqNiwX3kSEy5zwU3Eh4KngFb4EkKrHttgWkMfAG8Jn5VTrXq9TLszfgD7QE3ju7Op6uo/gAAAABJRU5ErkJggg==' },
  ];

  openDialog(): void {
    const dialogRef = this.dialog.open(RecordatoriosComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
