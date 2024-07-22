import { Activity } from './Activity';

export interface Stadium {
  id?: number;
  name?: string;
  activity?: Activity;
  photos?: string[];
  capacity?: string;
  surface?: string;
}
