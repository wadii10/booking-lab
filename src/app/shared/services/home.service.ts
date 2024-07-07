import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  activities: any[] = [
    { name: 'Foot-ball', photo: 'assets/demo/images/activities/football.jpeg' },
    { name: 'Basket-ball', photo: 'assets/demo/images/activities/basketball.jpeg' },
    { name: 'Hand-ball', photo: 'assets/demo/images/activities/handball.jpeg' },
    { name: 'Tennis', photo: 'assets/demo/images/activities/tennis.jpeg' },
  ];

  events: any[] = [
    { name: 'FootBall-Tournoi', image: 'assets/demo/images/activities/football.jpeg' },
    { name: 'BaskeBall-Event', image: 'assets/demo/images/activities/basketball.jpeg' },
    { name: 'HandBall-Event', image: 'assets/demo/images/activities/handball.jpeg' },
  ];

}
