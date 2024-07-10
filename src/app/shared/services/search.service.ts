import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  searchByCriteria(state: any, activity: any, date: any): Observable<any> {
    const params = new HttpParams()
      .set('state', state)
      .set('activity', activity)
      .set('date', date.toISOString().split('T')[0]);
    return this.http.get<any>(environment.baseApi, { params });
  }
}
