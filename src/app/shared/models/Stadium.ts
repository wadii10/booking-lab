import { Activity } from './Activity';
import { Company } from './Company';

export interface Stadium {
  id?: number;
  nameStadium?: string;
  company?:Company;
  price?:number;
  activity?: Activity;
  photos?: string[];
  capacity?: number;
  startTime: Date | string;
  endTime: Date  | string;
  duration: number;
}
