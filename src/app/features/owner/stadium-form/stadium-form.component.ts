import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stadium-form',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './stadium-form.component.html',
  styleUrl: './stadium-form.component.scss',
})
export class StadiumFormComponent implements OnInit {
  
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  stadiumForm!: FormGroup;

  initForm(): void {
    this.stadiumForm = this.fb.group({
      stadiumName: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  addStadium(): void {}
}
