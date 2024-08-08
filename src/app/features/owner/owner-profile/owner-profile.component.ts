import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { State } from '../../../shared/models/State';
import { StateService } from '../../../shared/services/state/state.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CompanyService } from '../../../shared/services/company/company.service';
import { Company } from '../../../shared/models/Company';
import { Address } from '../../../shared/models/Address';

@Component({
  selector: 'app-owner-profile',
  standalone: true,
  imports: [
    CommonModule,
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
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './owner-profile.component.html',
  styleUrl: './owner-profile.component.scss',
})
export class OwnerProfileComponent {

  companyForm!: FormGroup;

  states!: State[];
  address?: Address;

  companyProfile!: Company;

  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private authService: AuthService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getStates();
  }

  initForm(company:Company): void {
    this.companyForm = new FormGroup({
      companyName: new FormControl(company.companyName, [Validators.required]),
      companyEmail: new FormControl(company.companyEmail, [Validators.required, Validators.email]),
      detail: new FormControl(company.address?.detail || '', [Validators.required]),
      zip: new FormControl(company.address?.zip || 0),
      latitude: new FormControl(company.address?.latitude || 0),
      longitude: new FormControl(company.address?.longitude || 0),
      companyPhone: new FormControl (company.companyPhone, [Validators.required]),
      state: new FormControl(company.state?.id, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  
  send() {
    if (this.companyForm.valid) {
      // Send the form data
    }
  }

  // get all state
  getStates() {
    this.stateService.allState().subscribe({
      next: (data: any) => {
        this.states = data;
      },
      error: (err) => {
        // this.toastService.showError('Error', err.error.message);
      },
    });
  }

  getProfile() {
    const email = this.authService.getUserEmail();
    this.companyService.getCompanyProfile(email!).subscribe({
      next: (res) => {
        this.companyProfile = res;
        this.initForm(this.companyProfile!);
      },
      error: (err) => {},
    });
  }

}

// passwordMatchValidator(form: FormGroup) {
//   return form.get('password').value === form.get('confirmPassword').value
//     ? null : { 'passwordMatch': true };
// }