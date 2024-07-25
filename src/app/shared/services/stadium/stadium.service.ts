import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stadium } from '../../models/Stadium';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  constructor(private httpClient:HttpClient) { }

  //add stadium
  saveStadium(stadium:Stadium):Observable<void>{
    return (this.httpClient.post<void>(environment.baseApi+'/stadium', stadium));
  }

  //get all Stadium by company
  allStadium(id:number):Observable<Stadium[]>{
    return (this.httpClient.get<Stadium[]>(`${environment.baseApi}/stadium/list/${id}`));
  }
  //update stadium
  updateStadium(stadium:Stadium):Observable<void>{
    return (this.httpClient.put<void>(`${environment.baseApi}/stadium/${stadium.id}`, stadium))
  }
  //delete stadium
  deleteStadium(id:string):Observable<void>{
    return (this.httpClient.delete<void>(`${environment.baseApi}/stadium/${id}`));
  }
  
}
