import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IServiceResponse } from '../interfaces/iservice-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `http://localhost:8080/auth`;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService) {}

    login(login: string, password: string): Observable<IServiceResponse<string>> {
      const body = {
        login: login,
        password: password,
      };

      return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
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

    logout(): Observable<IServiceResponse<string>> {
      const token = this.getToken();
      if (!token) {
        this.clearToken();
        return new Observable(observer =>{
          observer.next({
            data: 'null',
            message:'Sem Token',
            status:'200'
          }as IServiceResponse<string>);
          observer.complete();
        })
      }
      return this.http.post<IServiceResponse<string>>(`${this.apiUrl}/logout`, {},
        { headers:{ Authorization:`Bearer ${token}` } }
      ).pipe(tap(()=>this.clearToken()))
    }

    clearToken(): void {
      localStorage.removeItem('auth_token');
    }
}
