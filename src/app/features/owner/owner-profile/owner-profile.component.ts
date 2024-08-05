import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-owner-profile',
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
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './owner-profile.component.html',
  styleUrl: './owner-profile.component.scss'
})
export class OwnerProfileComponent {
  companyForm!: FormGroup;

  states!: State[];

  companyProfile!: Company;

  constructor(private fb: FormBuilder, private stateService:StateService, private authService:AuthService, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getStates();
    this.getProfile();
    this.initForm();
  }

  initForm() :void {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      detail: ['', Validators.required],
      state: ['', Validators.required],
      companyPhone: ['', Validators.required],
      zip: [''],
      latitude: [''],
      longitude: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  // passwordMatchValidator(form: FormGroup) {
  //   return form.get('password').value === form.get('confirmPassword').value
  //     ? null : { 'passwordMatch': true };
  // }

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
     next : (res) => {
       this.companyProfile = res;
       console.log(this.companyProfile);
       this.companyForm.patchValue(this.companyProfile);
     },
     error : (err) => {
       
     }
   })
 }

}
