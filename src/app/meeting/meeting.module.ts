import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import { PreLlamadaComponent } from './pre-llamada/pre-llamada.component';
import { LlamadaComponent } from './llamada/llamada.component';
import { PostLlamadaComponent } from './post-llamada/post-llamada.component';


@NgModule({
  declarations: [
    MeetingComponent,
    PreLlamadaComponent,
    LlamadaComponent,
    PostLlamadaComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule
  ]
})
export class MeetingModule { }
