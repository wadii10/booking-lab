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
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  providers: [ToastService, ActivityService, MessageService],
  templateUrl: './list-activity.component.html',
  styleUrl: './list-activity.component.scss',
})
export class ListActivityComponent implements OnInit {
  constructor(
    private activityService: ActivityService,
    private toastService: ToastService
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
    this.activity = { ...activity };
  }

  confirmDelete(id:number) {
    this.deleteActivityDialog = false;
    this.activityService.deleteActivity(id).subscribe({
      next: (data: any) => {
        this.toastService.showSuccess('Successful', 'Activity Deleted');
      },
    });
    this.activity = {};
  }

  hideDialog() {
    this.activityDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editActivity(activity: Activity) {
    this.activity = { ...activity };
    this.activityDialog = true;
}
}
