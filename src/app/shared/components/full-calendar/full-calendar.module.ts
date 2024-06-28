import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFullCalendarComponent } from './full-calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';

@NgModule({
  declarations: [MyFullCalendarComponent],
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  exports: [FullCalendarModule,MyFullCalendarComponent],
  providers:[]
})
export class MyFullCalendarModule { }
