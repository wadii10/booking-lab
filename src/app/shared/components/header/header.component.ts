import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LayoutService } from '../layout/layout.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  providers:[LayoutService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  layoutService = inject(LayoutService)
}
