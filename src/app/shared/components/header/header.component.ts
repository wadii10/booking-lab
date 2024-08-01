import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService);
  isLoggedIn!:  boolean;
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn()
  }
  logout() {
    this.authService.logout();
  }
  router = inject(Router);
  
  title: String = "Booking App";
}
