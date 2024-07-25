import { Time } from '@angular/common';
import { Activity } from './Activity';

export interface Stadium {
  id?: number;
  nameStadium?: string;
  activity?: Activity;
  //photos?: string[];
  capacity?: number;
  company_id?: number;
  startTime?: Time;
  endTime?: Time;
}
