import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  host: {ngSkipHydration:"true"},
})
export class EventsComponent implements OnInit{
 
  responsiveOptions: any[] | undefined;

  constructor(private HS:HomeService) {}
  events !: any[];
  ngOnInit(): void {
    this.events = this.HS.events;
  }
  
  
}
