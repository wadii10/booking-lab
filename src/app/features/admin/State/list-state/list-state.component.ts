import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { StateService } from '../../../../shared/services/state/state.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { State } from '../../../../shared/models/State';

@Component({
  selector: 'app-list-state',
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
    StateService,
    MessageService,
    ConfirmationService,
  ],
  templateUrl: './list-state.component.html',
  styleUrl: './list-state.component.scss'
})
export class ListStateComponent implements OnInit {
  constructor(
    private stateService: StateService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  stateDialog: boolean = false;

  deleteStateDialog: boolean = false;

  states: State[] = [];

  state: State = {};

  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [{ field: 'state', header: 'state' }];

  ngOnInit(): void {
    this.cols;
    this.getStates();
  }

  // get all activity
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

  //delete activity
  deleteState(state: State) {
    this.deleteStateDialog = true;
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this State?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.stateService.deleteState(id).subscribe({
          next: (data: any) => {
            this.toastService.showSuccess('Successful', 'State Deleted');
            this.getStates();
          },
        });
      },
      reject: () => {
        this.toastService.showInfo('info!', 'You cancel the delete action');
      },
    });
  }

  hideDialog() {
    this.stateDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editState(state: State) {
    this.stateService.getOneState(state).subscribe({
      next: (data:State) => {
        this.state = data;
        this.stateDialog = true;
      }
    })
  }

  edit(state:State) {
    this.submitted = true;
    this.stateService.updateState(state).subscribe({
      next: (data: any) => {
        this.state = data;
        this.stateDialog = false;
        this.toastService.showSuccess('Successful', 'State Updated');
        this.getStates();
      }, error : (err) => {
        this.stateDialog = false;
        this.toastService.showError('Error', err.error.message);
      },
    });
  }
}
