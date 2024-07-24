import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../../shared/services/activity/activity.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Activity } from '../../../shared/models/Activity';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CompanyService } from '../../../shared/services/company/company.service';
import { Stadium } from '../../../shared/models/Stadium';
import { StadiumService } from '../../../shared/services/stadium/stadium.service';

@Component({
  selector: 'app-stadium-form',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [
    StadiumService,
    ActivityService,
    AuthService,
    ToastService,
    MessageService,
    CompanyService,
  ],
  templateUrl: './stadium-form.component.html',
  styleUrl: './stadium-form.component.scss',
})
export class StadiumFormComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private stadiumService: StadiumService,
    private activityService: ActivityService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}
  fb = inject(FormBuilder);

  activities?: Activity[];

  userEmail: string | null = null;

  stadium?: Stadium;

  id?: number;

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.getIdCompany();
    this.getActivities();
    this.initForm();
  }

  stadiumForm!: FormGroup;

  initForm(): void {
    this.stadiumForm = this.fb.group({
      nameStadium: ['', [Validators.required, Validators.minLength(6)]],
      capacity: [null, Validators.required],
      activity: ['', Validators.required],
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

  //get id
  getIdCompany() {
    this.companyService.getId(this.userEmail!).subscribe({
      next: (data: any) => {
        this.id = data;
        console.log(this.id);
      },
      error: (err) => {
        this.toastService.showError('Error', err.error.message);
      },
    });
  }

  addStadium(): void {
    if (this.stadiumForm.valid) {
      const { nameStadium, capacity, activity } = this.stadiumForm.value;
      this.stadium = {
        nameStadium,
        capacity,
        activity: { id: activity },
        company_id: this.id,
      };
      this.stadiumService.saveStadium(this.stadium).subscribe({
        next: (data: any) => {
          this.toastService.showSuccess('Success', 'Stadium added');
          this.stadiumForm.reset();
        },
        error: (err) => {
          this.toastService.showError('Error', err.error.message);
        },
      });
    }
  }
}
