import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProductResponse } from '../interfaces/iproduct';
import { Observable } from 'rxjs';
import { IServiceResponse } from '../interfaces/iservice-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `http://localhost:8080/products`;

  constructor(private http: HttpClient) {}

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/register-product`, product);
  }

  getProducts(): Observable<IServiceResponse<IProductResponse[]>> {
    return this.http.get<IServiceResponse<IProductResponse[]>>(this.apiUrl);
  }

  updateProduct(productId: number, updateProduct: IProduct): Observable<IProduct> {
    return this.http.put<IProductResponse>(`${this.apiUrl}/${productId}`, updateProduct);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`)
  }
  
}
