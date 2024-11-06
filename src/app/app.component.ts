import { Component } from '@angular/core';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Petwellness';
  showLayout: boolean = true;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.showLayout$.subscribe((show: boolean) => {
      this.showLayout = show;
    });
  }
}
