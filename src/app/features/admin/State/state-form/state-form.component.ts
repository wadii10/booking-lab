import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { StateService } from '../../../../shared/services/state/state.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { State } from '../../../../shared/models/State';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-state-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule
  ],
  providers: [ToastService, StateService, MessageService],
  templateUrl: './state-form.component.html',
  styleUrl: './state-form.component.scss'
})
export class StateFormComponent implements OnInit {

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
