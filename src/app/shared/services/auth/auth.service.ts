import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserSignup } from '../../models/User';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { getHeaders } from '../../../utils/http.util';
import { Company } from '../../models/Company';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  //for all role of users
  login(userLogin: UserLogin): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseApi + '/user/login', userLogin, {
        headers: getHeaders(),
      })
      .pipe(
        tap((result) => {
          localStorage.setItem('authUser', JSON.stringify(result));
        })
      );
  }

  //for User
  signUp(userSignUp: UserSignup): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseApi + '/user/signup',
      userSignUp
    );
  }

  //for Company
  signUpCompany(company: Company): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseApi+'/company/create', company
    )
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
