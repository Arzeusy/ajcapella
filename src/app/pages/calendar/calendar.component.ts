import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { takeUntil } from 'rxjs/operators';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  accent: {
    primary: '#be248d',
    secondary: '#be248d',
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarComponent  implements OnInit {
  // @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  fontStyleControl = new FormControl(CalendarView.Month);
  
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  private destroy$ = new Subject<void>();
  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();
  dia1 = moment("26/02/2023 19:00:00", "DD/MM/YYYY hh:mm:ss").toDate();
  dia2 = moment("12/03/2023 19:00:00", "DD/MM/YYYY hh:mm:ss").toDate();
  dia3 = moment("26/03/2023 19:00:00", "DD/MM/YYYY hh:mm:ss").toDate();
  dia4 = moment("09/04/2023 19:00:00", "DD/MM/YYYY hh:mm:ss").toDate();
  dia5 = moment("23/04/2023 19:00:00", "DD/MM/YYYY hh:mm:ss").toDate();
  dia6 = moment("07/05/2023 19:00:00", "DD/MM/YYYY hh:mm:ss").toDate();

  events: CalendarEvent[] = [
    {
      start: this.dia1,
      end: addHours(this.dia1, 2),
      title: 'INTRODUCCION AL AT Y NT \n AT: DIVISIÓN DEL AT',
      color: { ...colors['accent'] },
      actions: this.actions,
      // allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
   {
      start: this.dia2,
      end: addHours(this.dia2, 2),
      title: 'NT: DIVISIÓN DEL NT',
      color: { ...colors['accent'] },
      actions: this.actions,
      // allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
   {
      start: this.dia3,
      end: addHours(this.dia3, 2),
      title: 'CONTEXTO DE LAS ESCRITURAS',
      color: { ...colors['accent'] },
      actions: this.actions,
      // allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
   {
      start: this.dia4,
      end: addHours(this.dia4, 2),
      title: 'OTROS PRINCIPIOS DEL CONTEXTO',
      color: { ...colors['accent'] },
      actions: this.actions,
      // allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
   {
      start: this.dia5,
      end: addHours(this.dia5, 2),
      title: 'CONTEXTO DE GENERO',
      color: { ...colors['accent'] },
      actions: this.actions,
      // allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
    {
      start: this.dia6,
      end: addHours(this.dia6, 2),
      title: 'APOCALIPSIS',
      color: { ...colors['accent'] },
      actions: this.actions,
      // allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  ngOnInit() {
  const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          // this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          // this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      });
  }

}