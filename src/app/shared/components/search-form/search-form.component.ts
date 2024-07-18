import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ActivityService } from '../../services/activity/activity.service';
import { StateService } from '../../services/state/state.service';
import { State } from '../../models/State';
import { ToastService } from '../../services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Activity } from '../../models/Activity';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    CalendarModule,

  ],
  providers: [ActivityService, StateService, ToastService, MessageService],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {

  constructor(private fb:FormBuilder, private router:Router, private activityService: ActivityService, private stateService: StateService, private toastService: ToastService){}
  
  searchForm!: FormGroup;
  selectedState: any = null;
  date1: Date | undefined;
  states: State[] = [];
  activities: Activity[] = [];

  defaultState = { name: 'Sfax', code: 'Option 1' };
  todayDate = new Date();

  loading = false;

  ngOnInit(): void {
    this.initForm();
    this.getActivities();
    this.getStates();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      state: [this.defaultState],
      activity: ['', [Validators.required]],
      date: [this.todayDate],
    });
  }

  onSearch() {
    const state = this.searchForm.get('state')?.value;
    const activity = this.searchForm.get('activity')?.value;
    const date = this.searchForm.get('date')?.value.toISOString().split('T')[0];;
    this.loading = false;
    this.router.navigate(['home/search-results'], { queryParams: { state, activity, date } });
  }

  // get all state
  getStates() {
    this.stateService.allState().subscribe({
      next: (data: any) => {
        this.states = data;
      },
      error: (err) => {
        this.toastService.showError('Error', err.error.message);
      },
    });
  }
  // get all activity
  getActivities() {
    this.activityService.allActivity().subscribe({
      next: (data: any) => {
        this.activities = data;
      },
      error: (err) => {
        this.toastService.showError('Error', err.error.message);
      },
    });
  }

}
