import { Component } from '@angular/core';
import { StateFormComponent } from '../state-form/state-form.component';
import { ListStateComponent } from '../list-state/list-state.component';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [
    StateFormComponent,
    ListStateComponent
  ],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent {

}
