import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { HomeService } from '../../services/home.service';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  host: {ngSkipHydration:"true"},
})
export class CarouselComponent {
  
  responsiveOptions: any[] | undefined;
 
  constructor(private HS:HomeService) { }

  activities : any[] = this.HS.activities;
}
