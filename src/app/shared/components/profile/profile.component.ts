import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    AvatarModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute) {}
  
  signUpForm!: FormGroup;
  id: number = this.activatedRoute.snapshot.params["id"];

  ngOnInit(): void {
    this.getUserById();
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', this.confirmPasswordValidator.bind(this)],
        role: ['', Validators.required],
      }
    );
  }

  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.get('password')?.value) {
      return { passwordMatch: true };
    }
    return {};
  }

  getUserById() {
    this.userService.getUserById(this.id).subscribe({
      next : (res) => {
        console.log(res);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  update(): void {}
}
