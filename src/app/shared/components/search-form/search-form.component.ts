import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    CalendarModule,

  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {

  searchForm!: FormGroup;
  selectedState: any = null;
  date1: Date | undefined;

  constructor(private fb:FormBuilder, private router:Router){}
  dropdownItems = [
    { name: 'Sfax', code: 'Option 1' },
    { name: 'Sousse', code: 'Option 2' },
    { name: 'Tunis', code: 'Option 3' },
  ];

  defaultState = { name: 'Sfax', code: 'Option 1' };
  todayDate = new Date();

  loading = [false];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      state: [this.defaultState],
      activity: ['', [Validators.required]],
      date: [this.todayDate],
    });
  }

  load(index: number) {
    this.loading[index] = true;
    setTimeout(() => (this.loading[index] = false), 1000);
  }

  onSearch() {
    const state = this.searchForm.get('state')?.value;
    const activity = this.searchForm.get('activity')?.value;
    const date = this.searchForm.get('date')?.value.toISOString().split('T')[0];;

    this.loading[0] = false;
    console.log(date);
    this.router.navigate(['home/search-results'], { queryParams: { state, activity, date } });
  }
}
