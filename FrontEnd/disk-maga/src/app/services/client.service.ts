import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `http://localhost:8080/clients`;

  constructor(private http: HttpClient) {}

  createClient(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-client`, formData);
  }

  getClients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
