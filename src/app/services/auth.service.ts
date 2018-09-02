import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

export const AUTH = true;
export const NOT_AUTH = false;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatus: BehaviorSubject<boolean> = new BehaviorSubject(NOT_AUTH);

  public authEvent: Observable<boolean> = this.authStatus.asObservable();

  private authUrl: string = environment.auth_url;

  private _token: string;

  constructor(private httpClient: HttpClient) { }

  public registerNewUser(user: User): Observable<boolean> {
    return this.httpClient.post(`${this.authUrl}/signup`, user, { responseType: "text"})
      .pipe(map( (response: string): boolean => { 
                  this.token = response;
                  this.authStatus.next(AUTH);
                  return true; 
                }) );
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.httpClient.post(`${this.authUrl}/login`, { email, password }, { responseType: "text"})
      .pipe(map( (response: string): boolean => { 
                  this.token = response;
                  this.authStatus.next(AUTH);
                  return true; 
                }) );
  }

  public logout(): void {
    this.token = null;
    this.authStatus.next(NOT_AUTH);
  }

  public isAuth(): boolean {
    if (this._token || localStorage.getItem("token")) {
      return true;
    } 
    return false;
  }

  private set token(token: string) {
    this._token = token;
    if(token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem('token');
    }
  }
}
