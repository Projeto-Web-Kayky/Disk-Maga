import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `http://localhost:8080/clients`;

  constructor(private http: HttpClient) {}

  
}
