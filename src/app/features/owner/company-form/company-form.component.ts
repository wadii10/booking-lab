import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { StateService } from '../../../shared/services/state/state.service';
import { State } from '../../../shared/models/State';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Address } from '../../../shared/models/Address';
import { Company } from '../../../shared/models/Company';

import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
  ],
  providers: [StateService, ToastService, MessageService, AuthService],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private stateService: StateService,
    private toastService: ToastService
  ) {}

  companyForm!: FormGroup;
  states!: State[];
  state!: State;
  address!: Address;
  companyToSave!: Company;

  ngOnInit(): void {
    this.getStates();
    this.initForm();
  }

  initForm(): void {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: [null, [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', this.confirmPasswordValidator.bind(this)],
      detail: ['', Validators.required],
      zip: [null, Validators.required],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
      state: ['', Validators.required],
    });
  }

  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.companyForm.get('password')?.value) {
      return { passwordMatch: true };
    }
    return {};
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

  send(): void {
    if (this.companyForm.valid) {
      const {
        companyName,
        companyEmail,
        companyPhone,
        password,
        detail,
        zip,
        longitude,
        latitude,
        state,
      } = this.companyForm.value;
      this.companyToSave = {
        companyName,
        companyEmail,
        companyPhone,
        password,
        address: { detail, zip, longitude, latitude },
        state: { id: state },
      };
      this.authService.signUpCompany(this.companyToSave).subscribe({
        next: (data: any) => {
          this.toastService.showSuccess(
            'Company Registered',
            'Please check your Email.'
          );
          this.companyForm.reset();
        },
        error: (err) => {
          this.toastService.showError('Error', err.error.message);
        },
      });
    }
  }
}
