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
import { AuthService } from '../../../services/auth/auth.service';
import { UserLogin } from '../../../models/User';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  title: String = 'Booking App';
  loginForm!: FormGroup;
  errorMessage:string | null = null;
  userLogin!: UserLogin;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.userLogin = this.loginForm.value;
      this.authService.login(this.userLogin).subscribe(
        { next : (userData : any) => {
          //userData.user==null ? this.errorMessage='Login failed. Please check your email and password.' :this.router.navigate(['/']);
          if(this.authService.isLoggedIn()){
            this.router.navigate(['/profile'])}
            console.log(userData)
        },
        error : (err) => {
          this.errorMessage = 'Login failed. Please check your email and password.'+err;
        }}
      );
    }
  }
}
