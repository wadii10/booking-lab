import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";


@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    CommonModule,
		FormsModule,
		AutoCompleteModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		InputNumberModule
  ],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss'
})
export class CompanyFormComponent {
	value1: number = 42723;
}
