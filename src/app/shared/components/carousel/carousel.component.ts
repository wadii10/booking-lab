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

  activities: any[] = [
    { name: 'Foot-ball', photo: 'assets/demo/images/activities/football.jpeg' },
    { name: 'Basket-ball', photo: 'assets/demo/images/activities/basketball.jpeg' },
    { name: 'Hand-ball', photo: 'assets/demo/images/activities/handball.jpeg' },
    { name: 'Tennis', photo: 'assets/demo/images/activities/tennis.jpeg' },
  ];
}
