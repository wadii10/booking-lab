import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { ButtonModule } from 'primeng/button';


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
		ButtonModule
  ],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss'
})
export class CompanyFormComponent implements OnInit {
	
	companyForm!: FormGroup;
	constructor(private fb: FormBuilder) {}
  
	ngOnInit(): void {
	  this.initForm();
	}
  
	initForm(): void {
	  this.companyForm = this.fb.group(
		{
		  companyName: ['', Validators.required],
		  companyZip: [null, Validators.required],
		  companyAdresse: ['', Validators.required],
		  companyState: ['', Validators.required],
		  companyEmail: ['', [Validators.required, Validators.email]],
		  companyPhone: [null, [Validators.required, Validators.minLength(8)]],
		}
	  );
	}
  
	send(): void {}
  }