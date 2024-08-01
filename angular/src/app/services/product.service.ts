import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private ProductApiUrl : string = "https://localhost:7045/api/Products";

  constructor(private http : HttpClient) { }

  getProducts() : Observable<Product[]>{

    return this.http.get<Product[]>(`${this.ProductApiUrl}/GetProducts`);
  }



}
