import { User } from './../models/user.model';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();
  token!: string;
  public regitredUser: User = new User();

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  public id!: number;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isLocalStorageAvailable(): boolean {
    return (
      isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined'
    );
  }

  login(user: User) {
    return this.http.post<User>(environment.apiURL + '/login', user, {
      observe: 'response',
    });
  }

  getLoggedUserId(): number {
    if (!this.roles) {
    }
    return this.helper.decodeToken(this.token)?.userId || '';
  }
  getToken(): string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    this.id = decodedToken.id;
  }

  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') > -1;
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  registerUser(user: User) {
    return this.http.post<User>(environment.apiURL + '/register', user, {
      observe: 'response',
    });
  }
  setRegistredUser(user: User) {
    this.regitredUser = user;
  }
  getRegistredUser() {
    return this.regitredUser;
  }
  validateEmail(code: string) {
    return this.http.get<User>(environment.apiURL + '/verifyEmail/' + code);
  }

  saveToken(jwt: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('jwt', jwt);
    }
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  loadToken() {
    if (this.isLocalStorageAvailable()) {
      this.token = localStorage.getItem('jwt')!;
      this.decodeJWT();
    }
  }

  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('jwt');
    }
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    this.router.navigate(['/login']);
  }
}
