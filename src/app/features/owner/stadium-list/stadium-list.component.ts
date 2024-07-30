import { Component, OnInit } from '@angular/core';
import { Stadium } from '../../../shared/models/Stadium';
import { CompanyService } from '../../../shared/services/company/company.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { StadiumService } from '../../../shared/services/stadium/stadium.service';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stadium-list',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, CardModule, DataViewModule, ButtonModule],
  providers: [CompanyService, StadiumService, ToastService, MessageService],
  templateUrl: './stadium-list.component.html',
  styleUrl: './stadium-list.component.scss',
})
export class StadiumListComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private stadiumService: StadiumService,
    private toastService: ToastService
  ) {
    this.userEmail = this.authService.getUserEmail();
  }

  stadiums?: Stadium[];

  userEmail: string | null = null;

  id?: number;

  sortOrder: number = 0;

  sortField: string = '';

  ngOnInit(): void {
    this.getIdCompany();
  }

  //get id
  getIdCompany() {
    this.companyService.getId(this.userEmail!).subscribe({
      next: (data: any) => {
        this.id = data;
        //list of stadium

        this.stadiumService.allStadium(this.id!).subscribe({
          next: (data: Stadium[]) => {
            this.stadiums = data;
            console.log(this.stadiums);
          },
          error: (err) => {
            this.toastService.showError('Error', err.error.message);
          },
        });
      },
      error: (err) => {
        this.toastService.showError('Error', err.error.message);
      },
    });
  }
}
