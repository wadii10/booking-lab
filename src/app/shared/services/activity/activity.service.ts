import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../../models/Activity';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private httpClient: HttpClient) {}

  //add activity
  saveActivity(activity: Activity): Observable<void> {
    return this.httpClient.post<void>(
      environment.baseApi + '/activity',
      activity
    );
  }
  //get all activity
  allActivity(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(environment.baseApi + '/activity');
  }
  //update activity
  updateActivity(activity: Activity): Observable<void>{
    return (this.httpClient.put<void>(`${environment.baseApi}/activity/${activity.id}`, activity))
  }
  //delete activity
  deleteActivity(id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.baseApi}/activity/${id}`
    );
  }
}
