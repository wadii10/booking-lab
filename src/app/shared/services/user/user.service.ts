import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  //get user by id
  getUserById(id:number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApi}/user/${id}`);
  }
  
}
