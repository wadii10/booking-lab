import { Component, OnInit } from '@angular/core';
import { StateFormComponent } from '../State1/state-form/state-form.component';
import { ListStateComponent } from '../State1/list-state/list-state.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StateService } from '../../../shared/services/state/state.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { State } from '../../../shared/models/State';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToolbarModule } from 'primeng/toolbar';

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
  ],
  providers: [
    ToastService,
    StateService,
    MessageService,
    ConfirmationService,
  ],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent implements OnInit {

  stateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private toastService: ToastService
  ){}

  ngOnInit(): void {
    this.initForm();
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
        },
        error: (err) => {
          this.toastService.showError("Error", err.error.message);
        },
      });
    }
  }

}
