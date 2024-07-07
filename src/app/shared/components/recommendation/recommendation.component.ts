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
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent implements OnInit{

  responsiveOptions: any[] | undefined;
  
  constructor(private HS:HomeService) {

    
  }
  activities !: any[] ;

  ngOnInit(): void {
    this.activities = this.HS.activities;

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 1,
      },
    ];
  }
  
}
