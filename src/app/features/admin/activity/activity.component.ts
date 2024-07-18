import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivityService } from '../../../shared/services/activity/activity.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { Activity } from '../../../shared/models/Activity';
import { DividerModule } from 'primeng/divider';
import { Table, TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    DividerModule,
    TableModule,
    RippleModule,
    DialogModule,
    ConfirmDialogModule,
  ],
  providers: [ToastService, ActivityService, MessageService, ConfirmationService],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {

  activityForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ){}

  //get All part
  activityDialog: boolean = false;

  deleteActivityDialog: boolean = false;

  activities: Activity[] = [];

  activity: Activity = {};

  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [{ field: 'activity', header: 'activity' }];

  ngOnInit(): void {
    this.initForm();
    this.cols;
    this.getActivities();
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
          this.activityForm.reset();
          this.getActivities();
        },
        error: (err) => {
          this.toastService.showError("Error", err.error.message);
        },
      });
    }
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

  //delete activity
  deleteActivity(activity: Activity) {
    this.deleteActivityDialog = true;
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.activityService.deleteActivity(id).subscribe({
          next: (data: any) => {
            this.toastService.showSuccess('Successful', 'Activity Deleted');
            this.getActivities();
          },
        });
      },
      reject: () => {
        this.toastService.showInfo('info!', 'You cancel the delete action');
      },
    });
  }

  hideDialog() {
    this.activityDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editActivity(activity: Activity) {
    this.activityService.getOneActivity(activity).subscribe({
      next: (data:Activity) => {
        this.activity = data;
        this.activityDialog = true;
      }
    })
  }

  edit(activity:Activity) {
    this.submitted = true;
    this.activityService.updateActivity(activity).subscribe({
      next: (data: any) => {
        this.activity = data;
        this.activityDialog = false;
        this.toastService.showSuccess('Successful', 'Activity Updated');
        this.getActivities();
      }, error : (err) => {
        this.activityDialog = false;
        this.toastService.showError('Error', err.error.message);
      },
    });
  }

}
