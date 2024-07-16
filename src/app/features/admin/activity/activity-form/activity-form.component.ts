import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Activity } from '../../../../shared/models/Activity';
import { ActivityService } from '../../../../shared/services/activity/activity.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [ToastService, ActivityService, MessageService],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent implements OnInit {

  activityForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private toastService: ToastService
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.activityForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addActivity() {
    if (this.activityForm.valid) {
      const { name } = this.activityForm.value;
      const activity: Activity = { name };
      this.activityService.saveActivity(activity).subscribe({
        next: (data: any) => {
          this.toastService.showSuccess("Success!", "Activity added");
        },
        error: (err) => {
          this.toastService.showError("Error", err.error.message);
        },
      });
    }
  }

}
