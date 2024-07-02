import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit{
  activities: any[] = [
    { name: 'Foot-ball', photo: 'assets/demo/images/activities/football.jpeg' },
    { name: 'Basket-ball', photo: 'assets/demo/images/activities/basketball.jpeg' },
    { name: 'Hand-ball', photo: 'assets/demo/images/activities/handball.jpeg' },
    { name: 'Tennis', photo: 'assets/demo/images/activities/tennis.jpeg' },
  ];

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.activities;
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
