import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StadiumService } from '../../../shared/services/stadium/stadium.service';
import { Stadium } from '../../../shared/models/Stadium';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TimeFormatPipe } from '../../../utils/time-format.pipe';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-search-detail',
  standalone: true,
  imports: [
    GalleriaModule,
    TagModule,
    CardModule,
    DividerModule,
    TimeFormatPipe,
    ButtonModule,
    AvatarModule 
  ],
  templateUrl: './search-detail.component.html',
  styleUrl: './search-detail.component.scss'
})
export class SearchDetailComponent implements OnInit{

  stadiumId?: number ;
  stadium?: Stadium;

  responsiveOptions: any[] | undefined;

  constructor( private activatedRoute: ActivatedRoute, private stadiumService:StadiumService) {
    this.stadiumId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getStadium();
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  }

  getStadium() {
    this.stadiumService.getStadiumById(this.stadiumId!).subscribe(
      {
        next : (data) => {
          this.stadium = data;
          console.log(this.stadium)
        }
      }
    )
  }

}
