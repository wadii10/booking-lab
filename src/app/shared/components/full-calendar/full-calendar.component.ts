import {
  Component,
  ContentChild,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import {
  Calendar,
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'my-full-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
})
export class MyFullCalendarComponent implements OnInit, AfterViewInit {
  plugins = [dayGridPlugin, interactionPlugin, timeGridPlugin];
  _events!: any[];
  _editable = false;
  @Input() set editable(editable) {
    this._editable = editable;
    this.options = {
      ...this.options,
      editable: editable,
    };
  }
  get editable() {
    return this._editable;
  }
  @Input() set events(events: any[]) {
    (this.fullcalendar as any)?.getApi()?.removeAllEvents();
    this._events = events;
    delete this.options?.eventSources;
    this.options = {
      ...this.options,
      eventSources: [
        {
          events: events,
        },
      ],
    };
  }

  navButtons = ['prev', 'next', 'today'];
  viewModes = ['month', 'agendaWeek', 'agendaDay'];
  _weekNumber = '';
  set weekNumber(value: string) {
    this._weekNumber = value;
  }
  get weekNumber() {
    return this._weekNumber;
  }
  prevButton!: HTMLElement;
  nextButton!: HTMLElement;
  todayButton!: HTMLElement;
  @Input() initialView = 'timeGridWeek';
  //@Input() initialView = 'timeGridWeek'

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  @ViewChild('external') external!: ElementRef;
  @Output() onClick = new EventEmitter<EventClickArg>();
  @Output() onDateChanged = new EventEmitter<any>();
  @Output() onMove = new EventEmitter<EventDropArg>();
  @Output() onSelect = new EventEmitter<DateSelectArg>();
  @Output() onAdd = new EventEmitter<DropArg>();
  @ContentChild('draggableListHeader', { read: TemplateRef, static: false })
  draggableListHeader!: TemplateRef<any>;
  options: CalendarOptions = {
    viewClassNames: 'card',
    select: (arg: DateSelectArg) => {
      this.onSelect.emit(arg);
    },
    eventClick: (e) => {},
    eventDrop: (arg: EventDropArg) => {
      this.onMove.emit(arg);
    },
    drop: (arg: DropArg) => {
      this.onAdd.emit(arg);
    },
    plugins: this.plugins,
    slotDuration: '02:00:00',
    slotMinTime: '09:00:00',
    slotMaxTime: '23:00:00',
    firstDay: 1,
    selectable: true,
    editable: this.editable,
    droppable: this.editable,

    aspectRatio: 1,
    height: '500px',
    eventSources: [
      {
        events: this.events || [],
      },
    ],
    headerToolbar: {
      center: '',
      left: '',
    },
    defaultAllDay: false,
    initialView: this.initialView,
  };

  constructor() {
    const name = Calendar.name;
  }
  ngAfterViewInit(): void {
    //this.initCalendar();
  }

  ngOnInit(): void {}

  private initCalendar() {
    //this.intiDragable();
  }
  intiDragable() {
    this.external &&
      new Draggable(this.external.nativeElement, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          return {
            title: eventEl.innerText,
          };
        },
      });
  }
}
