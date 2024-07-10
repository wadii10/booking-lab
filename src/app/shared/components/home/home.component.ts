import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { CarouselComponent } from '../carousel/carousel.component';
import { EventsComponent } from '../events/events.component';
import { CalendarModule } from 'primeng/calendar';
import { RecommendationComponent } from '../recommendation/recommendation.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    StyleClassModule,
    PanelModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    CarouselComponent,
    EventsComponent,
    RecommendationComponent,
    CalendarModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
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
