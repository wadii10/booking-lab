import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StadiumService } from '../../../shared/services/stadium/stadium.service';
import { Stadium } from '../../../shared/models/Stadium';

@Component({
  selector: 'app-search-detail',
  standalone: true,
  imports: [],
  templateUrl: './search-detail.component.html',
  styleUrl: './search-detail.component.scss'
})
export class SearchDetailComponent implements OnInit{

  stadiumId?: number ;
  stadium?: Stadium;

  constructor( private activatedRoute: ActivatedRoute, private stadiumService:StadiumService) {
    this.stadiumId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getStadium();
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
