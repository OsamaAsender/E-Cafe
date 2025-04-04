import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../model/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productApiUrl = `${environment.apiUrl}Products`

  constructor(private http : HttpClient) { }

  getProducts(searchKey : string) : Observable <Product[]> { 
    
    return this.http.get<Product[]>(`${this.productApiUrl}/GetProducts?searchKey=${searchKey}`);
  }

  deleteProduct(id: number) : Observable<any> {
    throw new Error('Method not implemented.')
  }
}
