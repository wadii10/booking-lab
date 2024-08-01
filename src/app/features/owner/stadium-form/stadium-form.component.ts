import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormArray,
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
import { ActivityService } from '../../../shared/services/activity/activity.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Activity } from '../../../shared/models/Activity';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CompanyService } from '../../../shared/services/company/company.service';
import { Stadium } from '../../../shared/models/Stadium';
import { StadiumService } from '../../../shared/services/stadium/stadium.service';
import { CalendarModule } from 'primeng/calendar';
import { twoDigitValidator } from '../../../utils/http.util';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { CloudinaryService } from '../../../shared/services/cloudinary/cloudinary.service';

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
    DropdownModule,
    ToastModule,
    CalendarModule,
    FileUploadModule,
    InputNumberModule
  ],
  providers: [
    StadiumService,
    ActivityService,
    AuthService,
    ToastService,
    MessageService,
    CompanyService,
    CloudinaryService,
  ],
  templateUrl: './stadium-form.component.html',
  styleUrl: './stadium-form.component.scss',
})
export class StadiumFormComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private stadiumService: StadiumService,
    private activityService: ActivityService,
    private toastService: ToastService,
    private authService: AuthService,
    private cloudinaryService: CloudinaryService
  ) {}
  fb = inject(FormBuilder);

  activities?: Activity[];

  userEmail: string | null = null;

  stadium?: Stadium;

  id?: number;

  files: any[] = [];

  imageUrl?: string;

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.getIdCompany();
    this.getActivities();
    this.initForm();
  }

  stadiumForm!: FormGroup;

  initForm(): void {
    this.stadiumForm = this.fb.group({
      nameStadium: ['', [Validators.required, Validators.minLength(6)]],
      price: [null, [Validators.required]],
      activity: ['', Validators.required],
      capacity: [null, [Validators.required, twoDigitValidator()]],
      startT: ['', Validators.required],
      endT: ['', Validators.required],
      delay: [null, Validators.required],
      uploadedFiles: this.fb.array([])
    });
  }

  get uploadedFiles(): FormArray {
    return this.stadiumForm.get('uploadedFiles') as FormArray;
  }


  formatTime(date: Date): string {
    if (!date) return '';
    
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }

  addStadium(): void {
    if (this.stadiumForm.valid) {
      const {
        nameStadium,
        price,
        activity,
        delay,
        capacity,
        uploadedFiles,
        startT,
        endT,
      } = this.stadiumForm.value;
      this.stadium = {
        nameStadium,
        price:price,
        capacity,
        activity: { id: activity },
        company: { id :this.id},
        startTime:this.formatTime(startT),
        endTime:this.formatTime(endT),
        duration:delay,
        photos:uploadedFiles
      };
      console.log(this.stadium);
      this.stadiumService.saveStadium(this.stadium).subscribe({
        next: (data: any) => {
          this.toastService.showSuccess('Success', 'Stadium added');
          this.stadiumForm.reset();
        },
        error: (err) => {
          this.toastService.showError('Error', err.error.message);
        },
      });
    }
  }

  // get all activity
  getActivities() {
    this.activityService.allActivity().subscribe({
      next: (data: any) => {
        this.activities = data;
      },
      error: (err) => {
        this.toastService.showError('Error', err.error.message);
      },
    });
  }

  //get id
  getIdCompany() {
    this.companyService.getId(this.userEmail!).subscribe({
      next: (data: any) => {
        this.id = data;
      },
      error: (err) => {
        this.toastService.showError('Error', err.error.message);
      },
    });
  }

  //cloudiary
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadFile(file);
      this.files.push(file);
    }
  }

  uploadFile(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    this.cloudinaryService.upload(fd).subscribe({
      next: (data) => {
        this.imageUrl = data.url;
        console.log(this.imageUrl)
        this.uploadedFiles.push(this.fb.control(this.imageUrl));
        // this.uploadedFiles?.push(this.imageUrl)
        console.log(this.uploadedFiles)
      },
      error: (error) => {
        console.error('Upload error', error);
      },
    });
  }

}
