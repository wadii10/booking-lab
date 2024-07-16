import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../models/State';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private httpClient: HttpClient) {}

  //add state
  saveState(state: State): Observable<void> {
    return this.httpClient.post<void>(environment.baseApi + '/state', state);
  }
  //get all state
  allState(): Observable<State[]> {
    return this.httpClient.get<State[]>(environment.baseApi + '/state');
  }
  //get one activity
  getOneState(state: State): Observable<State> {
    return this.httpClient.get<State>(
      `${environment.baseApi}/state/${state.id}`
    );
  }
  //update state
  updateState(state: State): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.baseApi}/state/${state.id}`,
      state
    );
  }
  //delete state
  deleteState(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseApi}/state/${id}`);
  }
}
