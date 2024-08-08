import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    MenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  
  isLoggedIn!:  boolean;
  role?: string | null;

  profileItems?: MenuItem[];
  
  ngOnInit(): void {
    this.profileItems = [
      { label: 'Settings', icon: 'pi pi-cog', command: () => this.router.navigate(['/user/profile']) },
      { label: 'Reservation', icon: 'pi pi-calendar', command: () => this.router.navigate(['user/reservationList']) }
  ];
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
  }
  
  
  title: String = "Booking App";
}
