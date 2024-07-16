import { Component } from '@angular/core';
import { ActivityFormComponent } from '../activity-form/activity-form.component';
import { ListActivityComponent } from '../list-activity/list-activity.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    ActivityFormComponent,
    ListActivityComponent
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

}
