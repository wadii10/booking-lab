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
import { Calendar, CalendarOptions, DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from 'rxjs';

@Component({
  selector: 'my-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
})
export class MyFullCalendarComponent implements OnInit, AfterViewInit {
  plugins = [     dayGridPlugin,
    interactionPlugin,
    timeGridPlugin
  ]
  _events!: any[];
  _editable = false
  @Input() set editable(editable) {
    this._editable = editable
    this.options = {
      ...this.options,
      editable: editable
    };
  }
  get editable() {
    return this._editable
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
    select: (arg: DateSelectArg) => {
      this.onSelect.emit(arg);
    },
    eventClick: (e) => {
      
    },
    eventDrop: (arg: EventDropArg) => {
      this.onMove.emit(arg);
    },
    drop: (arg: DropArg) => {
      this.onAdd.emit(arg);
    },
    plugins:this.plugins,
    slotDuration:"02:00:00",
    slotMinTime:"09:00:00",
    slotMaxTime:"23:00:00",
    firstDay: 1,
    selectable: true,
    editable: this.editable,
    droppable: this.editable,

    aspectRatio: 1,
    height: '350px',
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
  @Output() query = new EventEmitter<string>();

  constructor(
  ) {
    const name = Calendar.name;
    this.weekNumber = this.calculateWeekNumber();
  }
  ngAfterViewInit(): void {
    this.initCalendar();
  }
  doNextWeek() {
    this.weekNumber = this.calculateWeekNumber();
  }
  doPreviostWeek() {
    this.weekNumber = this.calculateWeekNumber();
  }
  calculateWeekNumber() {
    const currentDate = (this.fullcalendar as any)?.calendar?.currentData
      ?.currentDate
      ? new Date((this.fullcalendar as any)?.calendar?.currentData?.currentDate)
      : new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor(
      (Number(currentDate) - Number(startDate)) / (24 * 60 * 60 * 1000)
    );
    this.onDateChanged.emit();
    return `${Math.ceil(days / 7)}-${currentDate.getFullYear()}`;
  }

  ngOnInit(): void { }

  private initCalendar() {
    this.prevButton = (this.fullcalendar as any).element.nativeElement
      .querySelector('.fc-next-button')
      .addEventListener('click', () => {
        this.doNextWeek();
      });
    this.prevButton = (this.fullcalendar as any).element.nativeElement
      .querySelector('.fc-prev-button')
      .addEventListener('click', () => {
        this.doPreviostWeek();
      });
    this.todayButton = (this.fullcalendar as any).element.nativeElement
      .querySelector('.fc-today-button')
      .addEventListener('click', () => {
        this.weekNumber = this.calculateWeekNumber();
      });
    this.weekNumber = this.calculateWeekNumber();
    const foo = document.getElementById('filter');
    const foo$ = foo && fromEvent(foo as any, 'input').pipe(
      map((e) => (foo as any).value)
    );
    const suggestions$ = foo$?.pipe(
      debounceTime(350),
      filter((query) => (query && query.length > 1) || !query),
      distinctUntilChanged()
    );
    suggestions$?.subscribe((x) => {
      this.query.emit(x);
    });
    this.intiDragable();
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
