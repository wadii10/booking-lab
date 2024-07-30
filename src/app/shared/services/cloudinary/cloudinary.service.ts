import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  
  constructor( private http:HttpClient) {}

  upload(vals:any): Observable<any> {
    let data = vals;
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this.http.post(`${environment.baseApi}/upload`,
      data, {headers}
    );
  }
}

