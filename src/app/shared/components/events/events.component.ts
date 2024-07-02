import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit{
  events = [
    { name: 'FootBall-Tournoi', image: 'assets/demo/images/activities/football.jpeg' },
    { name: 'BaskeBall-Event', image: 'assets/demo/images/activities/basketball.jpeg' },
    { name: 'HandBall-Event', image: 'assets/demo/images/activities/handball.jpeg' },
  ];

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    
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
