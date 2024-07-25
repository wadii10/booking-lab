import { Component, OnInit } from '@angular/core';
import { Stadium } from '../../../shared/models/Stadium';
import { CompanyService } from '../../../shared/services/company/company.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { StadiumService } from '../../../shared/services/stadium/stadium.service';

@Component({
  selector: 'app-stadium-list',
  standalone: true,
  imports: [],
  providers:[ CompanyService, AuthService, StadiumService, ToastService, MessageService],
  templateUrl: './stadium-list.component.html',
  styleUrl: './stadium-list.component.scss'
})
export class StadiumListComponent implements OnInit{

  constructor(private companyService:CompanyService, private authService:AuthService, private stadiumService:StadiumService, private toastService:ToastService) {}

  stadiums?: Stadium[];

  userEmail: string | null = null;

  id?: number;

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
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
            console.log(this.stadiums)
          },
          error: (err) => {
            this.toastService.showError('Error', err.error.message);
          }
        })
      },
      error: (err) => {
        this.toastService.showError('Error', err.error.message);
      },
    });
  }


}
