import { Component } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { RecommendationComponent } from '../recommendation/recommendation.component';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-home-body',
  standalone: true,
  imports: [
    EventsComponent,
    CarouselComponent,
    RecommendationComponent,
    SearchFormComponent
  ],
  templateUrl: './home-body.component.html',
  styleUrl: './home-body.component.scss'
})
export class HomeBodyComponent {

}
