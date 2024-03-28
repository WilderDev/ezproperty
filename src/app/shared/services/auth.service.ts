import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';


// Model for User
export interface User {
  id: number;
  username: string;
}

// Model for User being Registered
export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

// Model for User being Logged In
export interface LoginUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject<User | undefined | null>(null);



  get currentUser() {
    return this.user$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }


  // Sets Current User in order to continue Session
  setUser({ id, username}: User) {
    this.user$.next({ id, username });
  }

  // Function to Register New User
  // ! Need to Verify Route with Backend
  register({ username, email, password }: CreateUser) {
    return this.httpClient.post<{ user: User; token: string}>(`${environment.API_URL}/api/v1/auth/register`, { username, email, password })
    .pipe(tap(({ token }) => this.cookieService.set('token', token)));
  }

  // Function to Login User
  // ! Need to Verify Route with Backend
  login({ email, password }: LoginUser) {
    return this.httpClient.post<{ user: User; token: string }>(
      `${environment.API_URL}/api/v1/auth/login`, {email, password}
    )
    .pipe(tap(({ token }) => this.cookieService.set('token', token)));
  }

  // Used to check User Credentials
  me() {
    return this.httpClient.get<{ user: User }>(
      `${environment.API_URL}/api/v1/auth/me`
    )
  }

  // verificationToken, email

  verify(token, email) {
    return this.httpClient.post(`${environment.API_URL}/api/v1/auth/verify`, {email: email, verificationToken: token})
  }

  // Removes User from Session, Deletes Cookie, Routes to Landing Page
  logout() {
    this.cookieService.delete('token');
    this.user$.next(null);
    this.router.navigate(['/'])
  }
}
