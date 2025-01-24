import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interfce';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService)
  router = inject(Router)
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  access_token: string | null = null
  refresh_token: string | null = null

  get isAuth(){
    if(!this.access_token){
      this.access_token = this.cookieService.get('access_token')
      this.refresh_token = this.cookieService.get('refresh_token')
    }

    return !!this.access_token
  }

  login(payload: { username: string, password: string }) {
    const fd = new FormData()

    fd.append('username', payload.username)
    fd.append('password', payload.password)
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`, 
      fd
    ).pipe(
      tap(val => this.saveTokens(val))
    )
  }

  refreshAuthToken(){
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}refresh`, {
        refresh_token: this.refresh_token
      }
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout(){
    this.cookieService.deleteAll()
    this.access_token = null
    this.refresh_token = null
    this.router.navigate(['/login'])
  }

  saveTokens(res: TokenResponse){
    this.access_token = res.access_token
    this.refresh_token = res.refresh_token

    this.cookieService.set('access_token', this.access_token)
    this.cookieService.set('refresh_token', this.refresh_token)
  }
}

