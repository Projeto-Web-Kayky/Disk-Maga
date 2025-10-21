import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IServiceResponse } from '../interfaces/iservice-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `http://localhost:8080/auth/login`;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService) {}

    login(login: string, password: string): Observable<IServiceResponse<string>> {
      const body = {
        login: login,
        password: password,
      };

      return this.http.post<any>(this.apiUrl, body).pipe(
        tap((response) => {
          this.setToken(response.data);
        })
      );
    }

    setToken(token: string): void {
      localStorage.setItem('auth_token', token);
    }

    public isAuthenticated(): boolean {
      const token = this.getToken();
      return !!token && !this.jwtHelper.isTokenExpired(token);
    }

    getToken(): string | null {
      return localStorage.getItem('auth_token');
    }
}
