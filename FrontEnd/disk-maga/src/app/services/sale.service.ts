import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServiceResponse } from '../interfaces/iservice-response';
import { Observable } from 'rxjs';
import { ISale, ISaleResponse } from '../interfaces/isale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `http://localhost:8080/sales`

  constructor(private http: HttpClient){}

  getAllSales(): Observable<IServiceResponse<ISaleResponse[]>> {
    return this.http.get<IServiceResponse<ISaleResponse[]>>(this.apiUrl);
  }

  newSale(sale: ISale): Observable<any> {
    return this.http.post<ISale>(`${this.apiUrl}/new-sale`, sale)
  }
  
}
