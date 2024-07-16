import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { Table, TableModule } from 'primeng/table';
import { Activity } from '../../../../shared/models/Activity';
import { ActivityService } from '../../../../shared/services/activity/activity.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list-activity',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [
    ToastService,
    ActivityService,
    MessageService,
    ConfirmationService,
  ],
  templateUrl: './list-activity.component.html',
  styleUrl: './list-activity.component.scss',
})
export class ListActivityComponent implements OnInit {
  constructor(
    private activityService: ActivityService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  activityDialog: boolean = false;

  deleteActivityDialog: boolean = false;

  activities: any[] = [];

  activity: Activity = {};

  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [{ field: 'activity', header: 'activity' }];

  ngOnInit(): void {
    this.cols;
    this.getActivities();
  }

  // get all activity
  getActivities() {
    this.activityService.allActivity().subscribe({
      next: (data: any) => {
        this.activities = data;
        console.log(data);
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
      },
    });
  }
}
