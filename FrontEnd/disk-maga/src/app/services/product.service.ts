import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProductResponse } from '../interfaces/iproduct';
import { map, Observable } from 'rxjs';
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

 getProducts(): Observable<IServiceResponse<IProduct[]>> {
  return this.http.get<IServiceResponse<IProductResponse[]>>(this.apiUrl).pipe(
    map(response => {
      const mappedData = response.data.map(p => this.mapProductResponseToProduct(p));
      return {
        ...response,
        data: mappedData
      };
    })
  );
}

  updateProduct(productId: number, updateProduct: IProduct): Observable<IProduct> {
    return this.http.put<IProductResponse>(`${this.apiUrl}/${productId}`, updateProduct);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`)
  }

  searchProducts(name: string): Observable<IServiceResponse<IProduct[]>> {
    return this.http.get<IServiceResponse<IProductResponse[]>>(`${this.apiUrl}/search`, {
      params: { name }
    }).pipe(
      map(response => {
        const mappedData = response.data.map(p => this.mapProductResponseToProduct(p));
        return {
          ...response,
          data: mappedData
        };
      })
    );
  }

  private mapProductResponseToProduct(productResponse: IProductResponse): IProduct {
    return {
      id: productResponse.productId,
      productName: productResponse.productName,
      category: productResponse.category,
      costPrice: productResponse.costPrice,
      salePrice: productResponse.salePrice,
      quantity: productResponse.quantity,
      unityMeasure: productResponse.unityMeasure
    };
  }
}
