import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService } from '../../../shared/services/state/state.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { State } from '../../../shared/models/State';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-state',
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
    FloatLabelModule,
    ToolbarModule,
    DividerModule
  ],
  providers: [
    StateService,
    ConfirmationService,
    ToastService,
    MessageService,
  ],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent implements OnInit {

  stateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private toastService: ToastService,
    private confirmationService:ConfirmationService
  ){}

  // get all state
  stateDialog: boolean = false;

  deleteStateDialog: boolean = false;

  states: State[] = [];

  state: State = {};

  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [{ field: 'state', header: 'state' }];

  ngOnInit(): void {
    this.initForm();
    this.cols;
    this.getStates();
  }

  initForm(): void {
    this.stateForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addState() {
    if (this.stateForm.valid) {
      const { name } = this.stateForm.value;
      const state: State = { name };
      this.stateService.saveState(state).subscribe({
        next: (data: any) => {
          this.toastService.showSuccess("Success!", "State added");
          this.stateForm.reset();
          this.getStates();
        },
        error: (err) => {
          this.toastService.showError("Error", err.error.message);
        },
      });
    }
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

  //delete state
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
