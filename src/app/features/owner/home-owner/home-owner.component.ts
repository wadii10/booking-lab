import { Component } from '@angular/core';
import { HeaderOwnerComponent } from '../header-owner/header-owner.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { FooterOwnerComponent } from "../footer-owner/footer-owner.component";

@Component({
  selector: 'app-home-owner',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderOwnerComponent,
    FooterComponent,
    FooterOwnerComponent
],
  templateUrl: './home-owner.component.html',
  styleUrl: './home-owner.component.scss'
})
export class HomeOwnerComponent {

}
