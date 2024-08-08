import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationSummuryComponent } from '../reservation-summury/reservation-summury.component';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TimeFormatPipe } from '../../../utils/time-format.pipe';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { StepperModule } from 'primeng/stepper';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { UserLogin } from '../../../shared/models/User';
import { Stadium } from '../../../shared/models/Stadium';
import { Reservation, ReservationDetails } from '../../../shared/models/reservation';
import { TimeSlot, TimeSlot1 } from '../../../shared/models/timeSlot';
import { UserService } from '../../../shared/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { StadiumService } from '../../../shared/services/stadium/stadium.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ReservationService } from '../../../shared/services/reservation/reservation.service';
import { startOfMonth, endOfMonth, addMonths, subMonths, startOfWeek, endOfWeek, subWeeks } from 'date-fns';
import { format, addDays, isSameDay } from 'date-fns';
import { isToday ,addWeeks} from 'date-fns';

@Component({
  selector: 'app-reservation',
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
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  // sahar job
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private stadiumService: StadiumService,
    private authService: AuthService,
    private fb:FormBuilder,
    private reservationService:ReservationService,
    private cdr: ChangeDetectorRef
  ) {
    this.reservationForm = this.fb.group({
        date: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required]
      });
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  isLoggedIn!: boolean;
  loginForm!: FormGroup;
  stadiumId?: number;
  stadium?: Stadium;
  timeSlots: TimeSlot[] = [];
  userId?:number;
  userLogin!: UserLogin;

  // reservation part!
  reservationDetails: any;
  user = { email: '', password: '' , username:''};
  // isLoggedIn = false;
  selectedSlot: any ;
  currentStep: number = 1;
  selectedReservation: ReservationDetails | null = null;
 selectedDay: { day: string, date: string } | null = null;
 reservationForm!: FormGroup;
  message: string | null = null;
  availableDates: Reservation[] = [];
 availableTimeSlots: TimeSlot1[] = [];

 selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';
  currentMonth: Date = new Date();
  selectedMonth: Date = new Date();
  days: Array<{ day: string, date: string, isSelected: boolean, isToday : boolean }> = [];
  today: Date = new Date();
  currentWeekStart: Date = startOfWeek(new Date(), { weekStartsOn: 1 });
  selectedDates: { date: string; startTime: string; endTime: string }[] = [];
  Dates: Date | null = null;
  isReservationSuccessful: boolean = false;

  onSubmit(): void {
    if (this.selectedSlot) {
      this.reservationService.reserveDateTime(
        this.selectedSlot.stadiumId,
        this.selectedSlot.date,
        this.selectedSlot.startTime,
        this.selectedSlot.endTime
      ).subscribe(
        response => {
          console.log('Réservation réussie:', response);
        },
        error => {
          console.error('Erreur de réservation:', error);
        }
      );
    }

  }

  updateDays(): void {
    this.days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(this.currentWeekStart, i);
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      this.days.push({
        day: format(currentDate, 'eeee'),
        date: formattedDate,
        isSelected: this.selectedDate === formattedDate,
        isToday: isToday(currentDate)
      });
    }
  }

   selectDay(day: { day: string, date: string }): void {
    this.selectedDate = format(new Date(day.date), 'yyyy-MM-dd');
    this.updateDays();
    this.loadAvailableTimeSlots();
  }

  loadAvailableTimeSlots(): void {
    if (this.selectedDate) {
      this.reservationService.getAvailableTimes(this.stadiumId!, this.selectedDate)
        .subscribe(
          (timeSlots: TimeSlot1[]) => {
            this.availableTimeSlots = timeSlots;
            console.log('Créneaux horaires disponibles:', this.availableTimeSlots);
          },
          error => {
            console.error('Erreur de récupération des créneaux horaires:', error);
          }
        );
    }
  }

  reserveDate() {
    if (!this.selectedSlot) {
      console.error('Aucun créneau sélectionné.');
      return;
    }
    const stadiumId = 21;
    const date = '2024-07-31';
    const startTime = '10:00:00';
    const endTime = '11:00:00';

    this.reservationService.reserveDateTime(stadiumId, date, startTime, endTime)
    .subscribe(
      response => {
        console.log('Réponse du serveur:', response);
        console.log('Réservation réussie:', response);
        this.isReservationSuccessful = true;
        console.log('isReservationSuccessful après réservation réussie:', this.isReservationSuccessful);
        this.goToStep(2);
      },
      error => {
        console.error('Erreur de réservation:', error);
        this.isReservationSuccessful = false;
        console.log('isReservationSuccessful après échec de réservation:', this.isReservationSuccessful);
      }
    );
  }

previousWeek(): void {
  console.log('Previous week clicked');
  this.currentWeekStart = subWeeks(this.currentWeekStart, 1);
  this.updateDays();
}

nextWeek(): void {
  console.log('Next week clicked');
  this.currentWeekStart = addWeeks(this.currentWeekStart, 1);
  this.updateDays();
}

loadWeekDays(): void {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 0 });
  const end = endOfWeek(today, { weekStartsOn: 0 });

  this.days = [];
  for (let date = start; date <= end; date = addDays(date, 1)) {
    this.days.push({
      day: format(date, 'EEEE'), // Day of the week (e.g., Monday)
      date: format(date, 'yyyy-MM-dd'), // Date in yyyy-MM-dd format
      isSelected: false,
      isToday: format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
    });
  }
}

loadAvailableDates(): void {
  if (this.selectedDate) {
    const dateStr = format(this.selectedDate, 'yyyy-MM-dd');
    this.reservationService.getAvailableTimes(this.stadiumId!, dateStr).subscribe(
      (dates: any[]) => {
        this.availableDates = dates;
        console.log('Available Dates:', this.availableDates);
      },
      error => {
        console.error('Error loading available dates:', error);
      }
    );
  }
}

cancelReservation(date: any): void {
  const stadiumId = 21;

  this.reservationService.cancelReservation(stadiumId, date.date, date.startTime, date.endTime)
    .subscribe(
      response => {
        console.log(`Annulation réussie pour ${date.date} de ${date.startTime} à ${date.endTime}:`, response);
        this.selectedDates = this.selectedDates.filter(d =>
          d.date !== date.date ||
          d.startTime !== date.startTime ||
          d.endTime !== date.endTime
        );
      },
      error => {
        console.error(`Erreur d'annulation pour ${date.date} de ${date.startTime} à ${date.endTime}:`, error);
      }
    );
}
toggleSwitch(event: Event, date: any): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      // Réserver quand la case est cochée
      this.reservationService.reserveDateTime(this.stadiumId!, date.date, date.startTime, date.endTime)
        .subscribe(
          response => {
            console.log(`Réservation réussie pour ${date.date} de ${date.startTime} à ${date.endTime}:`, response);
            // Mettre à jour la liste des dates sélectionnées
            this.selectedDates.push(date);

            this.selectedReservation = {
              date: date.date,
              startTime: date.startTime,
              endTime: date.endTime,
              price: date.price
            };

          },
          error => {
            console.error(`Erreur de réservation pour ${date.date} de ${date.startTime} à ${date.endTime}:`, error);
            checkbox.checked = false;
          }
        );
    } else {
      // Annuler la réservation quand la case est décochée
      this.reservationService.cancelReservation(this.stadiumId!, date.date, date.startTime, date.endTime)
        .subscribe(
          response => {
            console.log(`Annulation réussie pour ${date.date} de ${date.startTime} à ${date.endTime}:`, response);
            // Mettre à jour la liste des dates sélectionnées
            this.selectedDates = this.selectedDates.filter(d =>
              d.date !== date.date ||
              d.startTime !== date.startTime ||
              d.endTime !== date.endTime
            );

          },
          error => {
            console.error(`Erreur d'annulation pour ${date.date} de ${date.startTime} à ${date.endTime}:`, error);
            checkbox.checked = true;
          }
        );
    }
    this.cdr.detectChanges();
  }

  isChecked(date: any): boolean {
    return this.selectedDates.some(d =>
      d.date === date.date &&
      d.startTime === date.startTime &&
      d.endTime === date.endTime
    );
  }
ngOnInit(): void {
    this.stadiumId = this.activatedRoute.snapshot.params['id'];
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadAvailableDates();
    this.updateDays();
    this.loadWeekDays();
    this.loadAvailableTimeSlots();
    this.getStadium();
    this.initFormLogin();
  }
selectSlot(slot: any) {
    this.selectedSlot = slot;
    this.currentStep = 2;
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  // get stadium by id
  getStadium() {
    this.stadiumService.getStadiumById(this.stadiumId!).subscribe({
      next: (data) => {
        this.stadium = data;
        console.log(this.stadium);
      },
    });
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
        //   this.getUser();
        },
        error : (err) => {
        //   this.errorMessage = 'Login failed. Please check your email and password.';
        }}
      );
    }
  }

}
