import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserSignup } from '../../models/User';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { getHeaders } from '../../../utils/http.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(userLogin: UserLogin): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseApi + '/login', userLogin, {
        headers: getHeaders(),
      })
      .pipe(
        tap((result) => {
          localStorage.setItem('authUser', JSON.stringify(result));
        })
      );
  }

  signUp(userSignUp: UserSignup): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseApi + '/signUp',
      userSignUp
    );
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
