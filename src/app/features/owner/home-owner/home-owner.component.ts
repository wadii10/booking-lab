import { Component } from '@angular/core';
import { HeaderOwnerComponent } from '../header-owner/header-owner.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-owner',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderOwnerComponent
  ],
  templateUrl: './home-owner.component.html',
  styleUrl: './home-owner.component.scss'
})
export class HomeOwnerComponent {

}
