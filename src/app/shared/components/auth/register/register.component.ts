import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DividerModule } from 'primeng/divider';
import { Router, RouterLink } from '@angular/router';
import { UserSignup } from '../../../models/User';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    RadioButtonModule,
    DividerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  title: String = 'Booking App';

  signUpForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', this.confirmPasswordValidator.bind(this)],
      role: ['', Validators.required],
    });
  }

  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.get('password')?.value) {
      return { passwordMatch: true };
    }
    return {};
  }

  signUp() {
    if (this.signUpForm.valid) {
      const { firstName, lastName, email, password, role } =
        this.signUpForm.value;
      const userSignUp: UserSignup = {
        firstName,
        lastName,
        email,
        password,
        role,
      };
      this.authService.signUp(userSignUp).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (err) => console.log(err),
      });
    }
  }
  
}
