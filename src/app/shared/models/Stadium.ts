import { Activity } from './Activity';

export interface Stadium {
  id?: number;
  nameStadium?: string;
  activity?: Activity;
  photos?: string[];
  capacity?: number;
  company_id?: number;
  startTime: Date | string;
  endTime: Date  | string;
  duration: number;
}
