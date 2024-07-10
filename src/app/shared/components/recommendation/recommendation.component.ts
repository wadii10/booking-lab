import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    DividerModule,
    RippleModule,
    TagModule,
    CarouselModule
  ],
  providers: [HomeService],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss',
  host: {ngSkipHydration:"true"},
})
export class RecommendationComponent implements OnInit{

  responsiveOptions: any[] | undefined;
  
  constructor(private HS:HomeService) {

    
  }
  activities: any[] = [
    { name: 'Foot-ball', photo: 'assets/demo/images/activities/football.jpeg' },
    { name: 'Basket-ball', photo: 'assets/demo/images/activities/basketball.jpeg' },
    { name: 'Hand-ball', photo: 'assets/demo/images/activities/handball.jpeg' },
    { name: 'Tennis', photo: 'assets/demo/images/activities/tennis.jpeg' },
  ];

  //activities !: any[] ;

  ngOnInit(): void {
    
  }
  
}
