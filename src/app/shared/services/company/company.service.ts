import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Company } from '../../models/Company';

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

  //get Profie company
  getCompanyProfile(email:string): Observable<Company> {
    return this.httpClient.get<Company>(`${environment.baseApi}/company/profile/${email}`);
  }
}
