import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  host: {ngSkipHydration:"true"},
})
export class EventsComponent {
 
  responsiveOptions: any[] | undefined;

  events: any[] = [
    { name: 'Foot-ball', photo: 'assets/demo/images/activities/football.jpeg' },
    { name: 'Basket-ball', photo: 'assets/demo/images/activities/basketball.jpeg' },
    { name: 'Hand-ball', photo: 'assets/demo/images/activities/handball.jpeg' },
    { name: 'Tennis', photo: 'assets/demo/images/activities/tennis.jpeg' },
  ];
  
  
}
