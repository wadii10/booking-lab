import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';


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
 

  activities : any[] = [];
}
