import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserSignup } from '../../models/User';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { getHeaders } from '../../../utils/http.util';
import { Company } from '../../models/Company';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router:Router) {}

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

  getUserEmail(): string | null {
    const user = localStorage.getItem('authUser');
    if (user) {
      return JSON.parse(user).email;
    }
    return null;
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('authUser');
    if (user) {
      return JSON.parse(user).role;
    }
    return null;
  }

  navigateByRole(): void {
    const role = this.getUserRole();
    if (role) {
      switch (role) {
        case 'OWNER':
          this.router.navigate(['/owner']);
          break;
        case 'ADMIN':
          this.router.navigate(['/admin']);
          break;
        case 'USER':
          this.router.navigate(['/prodile']);
          break;
        default:
          this.router.navigate(['/login']);
          break;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
