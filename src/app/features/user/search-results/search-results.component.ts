import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchService } from '../../../shared/services/search/search.service';
import { Stadium } from '../../../shared/models/Stadium';
import { SearchForm } from '../../../shared/models/search';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { StateService } from '../../../shared/services/state/state.service';
import { State } from '../../../shared/models/State';
import { Activity } from '../../../shared/models/Activity';
import { ActivityService } from '../../../shared/services/activity/activity.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CardModule,
    DataViewModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    GalleriaModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ToolbarModule,
    AvatarModule
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private stateService: StateService,
    private activityService: ActivityService,
    private router: Router
  ) {
    
  }

  
  activity?: number;
  state?: number;
  selectedState: any;
  selectedActivity: any;
  searchResults: Stadium[] = [];
  images: any[] | undefined;
  
  searchReq!: SearchForm;

  loading: boolean = false;

  //search form
  searchForm!: FormGroup;
  date1: Date | undefined;
  states: State[] = [];
  activities: Activity[] = [];
  todayDate = new Date();
  
  ngOnInit(): void {
    this.initForm();
    this.activity = Number.parseInt(this.activatedRoute.snapshot.queryParams['activity']);
    this.state = Number.parseInt(this.activatedRoute.snapshot.queryParams['state']);
    this.searchForm.patchValue({state:this.state, activity: this.activity});
    this.getStates();
    this.getActivities();
    this.onSearch();
  }
  
  ngAfterViewInit(): void {
    this.onScroll();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.onScroll();
  }

  onScroll() {
    const centerDiv = document.getElementById('stickyFilter');
    if (centerDiv) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const triggerPosition = viewportHeight * 0.2;

      if (scrollPosition > triggerPosition) {
        centerDiv.classList.add('fixed');
      } else {
        centerDiv.classList.remove('w-full');
      }
    }
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      state: [null, [Validators.required]],
      activity: [null, [Validators.required]],
      date: [this.todayDate],
    });
  }

  onSearch() {
    this.searchReq = { activityId: this.searchForm.controls['activity'].value, stateId: this.searchForm.controls['state'].value};
    this.searchService.searchByCriteria(this.searchReq).subscribe({
      next: (data: any) => {
        this.searchResults = data;
        this.images = this.searchResults?.map((el) => el.photos);
        console.log(this.searchResults);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  search() {
    const stateForm = this.searchForm.get('state')?.value;
    const activityForm = this.searchForm.get('activity')?.value;
    this.loading = false;
    this.searchReq = { activityId: activityForm, stateId: stateForm };
    this.searchService.searchByCriteria(this.searchReq).subscribe({
      next: (data: any) => {
        this.searchResults = data;
        this.images = this.searchResults?.map((el) => el.photos);
        console.log(this.searchResults);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // get all state
  getStates() {
    this.stateService.allState().subscribe({
      next: (data: any) => {
        this.states = data;
      },
      error: (err) => {
        // this.toastService.showError('Error', err.error.message);
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
        // this.toastService.showError('Error', err.error.message);
      },
    });
  }

  detail(id: number) {
    this.router.navigate([`search-detail/${id}`]);
  }
}
