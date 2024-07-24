import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private httpClient: HttpClient) { }

  //get id company
  getId(email:string): Observable<number> {
    return this.httpClient.get<number>(
      `${environment.baseApi}/company/getId/${email}`
    );
  }
}
