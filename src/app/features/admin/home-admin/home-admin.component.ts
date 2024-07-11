import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderAdminComponent
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

}
