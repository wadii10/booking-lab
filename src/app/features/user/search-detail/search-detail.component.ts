import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReservationSummuryComponent } from '../reservation-summury/reservation-summury.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserLogin, UserProfile } from '../../../shared/models/User';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TimeSlot, TimeSlotData } from '../../../shared/models/timeSlot';
import { ReservationService } from '../../../shared/services/reservation/reservation.service';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../shared/services/user/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../shared/services/toast/toast.service';

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
    InputSwitchModule,
    PasswordModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule
  ],
  providers: [ToastService, ConfirmationService, MessageService],
  templateUrl: './search-detail.component.html',
  styleUrl: './search-detail.component.scss',
})

export class SearchDetailComponent implements OnInit {
  
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private stadiumService: StadiumService,
    private authService: AuthService,
    private fb:FormBuilder,
    private reservationService:ReservationService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}
  
  isLoggedIn!: boolean;

  stadiumId?: number;
  stadium?: Stadium;
  timeSlots: TimeSlot[] = [];
  userId?:number;

  //step1
  weekDays: { day: string; date: Date, timeSlots: TimeSlot[] }[] = [];
  selectedSlot: any | null = null;
  activeIndex: number = 0;
  selectedDay?: Date;
  //step2
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  userLogin!: UserLogin;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  ngOnInit(): void {
    this.stadiumId = Number.parseInt(this.activatedRoute.snapshot.params['id']);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.responsiveOptions;
    this.generateWeekDays();
    this.getStadium();
    this.initFormLogin();
    this.getTimeSlotsByStadium(this.today());
    this.getUser()
  }

  //step 1
  generateWeekDays() {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay();
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today.setDate(startOfWeek + i));
      this.weekDays.push({
        day: currentDay.toLocaleDateString('en-US', { weekday: 'long' }),
        date: currentDay,
        timeSlots: []
      });
    }
  }

  // disable the day before today!
  isDisabled(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return date < today;
  }

  filterTimeSlots(timeSlots: TimeSlot[]): TimeSlot[] {
    const now = new Date();
    now.setMinutes(0, 0, 0); // Set minutes and seconds to 0 for comparison
  
    return timeSlots.filter(slot => {
      const slotStartTime = new Date(`${slot.slotStart}:00`);
      return slotStartTime >= now;
    });
  }

  formatDate(dateX:any) {
    let date = new Date(dateX);
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  getTimeSlotsByStadium(date: any = new Date()) {
    const formattedDate = this.formatDate(date);
    this.stadiumService.getTimeSlots(this.stadiumId!, formattedDate).subscribe({
      next: (data: TimeSlot[]) => {
        // this.timeSlots = data;
        this.distributeTimeSlots(data);
      },
    });
  }


  distributeTimeSlots(timeSlots: TimeSlot[]) {
    this.weekDays.forEach(day => {
      day.timeSlots = timeSlots.map(slot => ({
        ...slot,
        selected: false, 
      }));
    });
  }

  convertTimeStringToDate(timeString: string, baseDate: Date): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      hours,
      minutes,
      seconds
    );
  }

  onSlotSelect(slot: any) {
    this.selectedSlot = slot;
    console.log('Selected slot:', slot);
  }

  onSlotToggle(slot: any, date: Date) {
    if (slot.selected) {
      this.selectedSlot = { ...slot, date };
      console.log('Selected Slot:', this.selectedSlot);
    } else {
      this.selectedSlot = null;
      console.log('Deselected Slot:', this.selectedSlot);
    }
  }


  filterTimeSlotsByDate(timeSlots: TimeSlotData, selectedDate: Date): TimeSlot[] {
    const selectedDaySlots = timeSlots.find(daySlots => daySlots.date.toDateString() === selectedDate.toDateString());
    return selectedDaySlots ? selectedDaySlots.slots : [];
  }

  isSlotSelected(): boolean {
    return this.selectedSlot;
  }

  //step 2
  confirmBooking(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to book this stadium?',
        header: 'Booking Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          let appointment = { stadiumId: this.stadiumId,      timeSlotId: this.selectedSlot.id, date: this.formatDate(new Date(this.selectedSlot.date)), userId: this.userId}
          console.log(appointment);
          this.reservationService.reserveStadium(appointment).subscribe({
            next: (data) => {
              this.toastService.showSuccess("Success", "Booking Confirmed");
              this.getTimeSlotsByStadium(this.today());
            }
          })
        },
        reject: () => {
          this.toastService.showError("Canceled", "Booking canceled");
        }
    });
}
  confirmReservation() {

    // Format the date to DD-MM-YYYY
    let date = new Date(this.selectedSlot.date);
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let year = date.getFullYear();
    let formattedDate = `${year}-${month}-${day}`;

    let appointment = { stadiumId: this.stadiumId,      timeSlotId: this.selectedSlot.id, date: this.formatDate(new Date(this.selectedSlot.date)), userId: this.userId}
    console.log(appointment);
    this.reservationService.reserveStadium(appointment).subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }

  // get stadium by id
  getStadium() {
    this.stadiumService.getStadiumById(this.stadiumId!).subscribe({
      next: (data) => {
        this.stadium = data;
        
        console.log(this.stadium);
      },error : (err) => {
        console.log(err);
      }
    });
  }

  // get user who book the stadium
  getUser() {
    const email = this.authService.getUserEmail();
    let userProfile:UserProfile = {};
     this.userService.getUserById(email!).subscribe({
      next : (res : UserProfile) => {
        userProfile = res;
        this.userId = userProfile?.id
        console.log(userProfile)
      },
      error : (err) => {
        
      }
    })
  }
  
  initFormLogin(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

 
  login() {
    if (this.loginForm.valid) {
      this.userLogin = this.loginForm.value;
      this.authService.login(this.userLogin).subscribe(
        { next : (userData : any) => {
          this.isLoggedIn = true;
          this.getUser();
        },
        error : (err) => {
          this.errorMessage = 'Login failed. Please check your email and password.';
        }}
      );
    }
  }


isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

today() {
  this.selectedDay = new Date();
  this.activeIndex = this.weekDays.findIndex(
    (day) => day.date.toDateString() === this.selectedDay!.toDateString()
  );
  this.getTimeSlotsByStadium(this.selectedDay);
}

}
