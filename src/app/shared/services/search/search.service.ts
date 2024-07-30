import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { SearchForm } from '../../models/search';



@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private http:HttpClient) { }

  searchByCriteria(search: SearchForm): Observable<any> {
    return this.http.post<any>(`${environment.baseApi}/filter/stadiums`, search)
  }
  
}
