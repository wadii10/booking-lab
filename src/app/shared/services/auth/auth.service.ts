import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { UserLogin, UserSignup } from '../../models/User';
import { getHeaders } from '../../../utils/http.util';
import { Company } from '../../models/Company';

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
    this.router.navigate(['/login'])
  }

  isLoggedIn() {
    const user = localStorage.getItem('authUser')
    return (user && JSON.parse(user).id !== null) || false;
  }

  getUserEmail(): string | null {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('authUser');
      if (user) {
        return JSON.parse(user).email;
      }
    }
    return null;
  }

  getUserRole(): string | null {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('authUser');
      if (user) {
      return JSON.parse(user).role;
      }
    }
    return null;
  }

  navigateByRole(id:number): void {
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
          if (id) {
            this.router.navigate([`/user/profile`, id]);
          } else {
            this.router.navigate(['/login']);
          }
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
