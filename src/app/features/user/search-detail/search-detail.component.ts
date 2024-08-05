import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StadiumService } from '../../../shared/services/stadium/stadium.service';
import { Stadium } from '../../../shared/models/Stadium';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TimeFormatPipe } from '../../../utils/time-format.pipe';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { StepperModule } from 'primeng/stepper';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule, formatDate } from '@angular/common';
import { addWeeks, startOfWeek, endOfWeek, format, addDays, isSameDay } from 'date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReservationSummuryComponent } from '../reservation-summury/reservation-summury.component'
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-search-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReservationSummuryComponent,
    GalleriaModule,
    TagModule,
    CardModule,
    DividerModule,
    TimeFormatPipe,
    ButtonModule,
    AvatarModule,
    StepperModule,
    TabViewModule,
    InputSwitchModule
  ],
  templateUrl: './search-detail.component.html',
  styleUrl: './search-detail.component.scss'
})
export class SearchDetailComponent implements OnInit{

  constructor( private activatedRoute: ActivatedRoute, private stadiumService:StadiumService, private authService:AuthService) {
  }

  isLoggedIn!:  boolean;

  stadiumId?: number ;
  stadium?: Stadium;
  timeSlots?: any[];

  //step1
  weekDays: { day: string, date: Date }[] = [];
  selectedSlot: any | null = null;
  activeIndex: number = 0;
  selectedDay?: Date;
  


  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  ngOnInit(): void {
    this.stadiumId = this.activatedRoute.snapshot.params['id'];
    this.isLoggedIn = this.authService.isLoggedIn();
    this.responsiveOptions;
    this.getStadium();
    this.getTimeSlotsByStadium();
    this.generateWeekDays();
  }

  // get stadium by id
  getStadium() {
    this.stadiumService.getStadiumById(this.stadiumId!).subscribe(
      {
        next : (data) => {
          this.stadium = data;
          console.log(this.stadium)
        }
      }
    )
  }

  //step 1 
  generateWeekDays() {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay();
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today.setDate(startOfWeek + i));
      this.weekDays.push({ day: currentDay.toLocaleDateString('en-US', { weekday: 'long' }), date: currentDay });
    }
  }

  getTimeSlotsByStadium() {
    this.stadiumService.getTimeSlots(this.stadiumId!).subscribe({
      next: (data) => {
        this.timeSlots = data;
        console.log(this.timeSlots)
      }
    });
  }

  getSlotsForDay(date: Date): any[] {
    // Ensure 'date' is a valid Date object
    if (!date) return [];
  
    // Convert the date to a format that matches the slot date if necessary
    return this.timeSlots!.filter( (slot) => {
      const slotStartDate = this.convertTimeStringToDate(slot.slotStart, date);
      return slotStartDate.toDateString() === date.toDateString();
    });
  }
  
  convertTimeStringToDate(timeString: string, baseDate: Date): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hours, minutes, seconds);
  }

  onSlotSelect(slot: any) {
    this.selectedSlot = slot;
    console.log('Selected slot:', slot);
  }

  // onSlotToggle(slot: any) {
  //   if (slot.selected) {
  //     this.selectedSlot = slot;
  //     console.log(this.selectedSlot)
  //   } else {
  //     this.selectedSlot = null;
  //     console.log(this.selectedSlot)
  //   }
  // }

  onSlotToggle(slot: any, date: Date) {
    if (slot.selected) {
      this.selectedSlot = { ...slot, date };
      console.log('Selected Slot:', this.selectedSlot);
    } else {
      this.selectedSlot = null;
      console.log('Deselected Slot:', this.selectedSlot);
    }
  }

  isSlotSelected(): boolean {
    return this.timeSlots!.some(slot => slot.selected);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  today() {
    this.selectedDay = new Date();
    this.activeIndex = this.weekDays.findIndex(day => day.date.toDateString() === this.selectedDay!.toDateString());
  }
  
  isChecked(date: any): boolean {
    return true;
  }
  
  //step 2
  confirmReservation() {
    // Implement reservation confirmation logic here
    console.log('Reservation confirmed!');
  }
}
