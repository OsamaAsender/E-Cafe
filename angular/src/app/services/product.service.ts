import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products/product.model';
import { Observable } from 'rxjs';
import { CreateUpdateCategoryComponent } from '../category/create-update-category/create-update-category.component';
import { CreateUpdateProduct } from '../models/products/createupdateproduct.model';
import { ProductDetails } from '../models/products/productdetails.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private ProductApiUrl : string = "https://localhost:7045/api/Products";

  constructor(private http : HttpClient) { }

  getProducts() : Observable<Product[]>{

    return this.http.get<Product[]>(`${this.ProductApiUrl}/GetProducts`);
  }

  getProduct(id : number) : Observable<ProductDetails>{
    return this.http.get<ProductDetails>(`${this.ProductApiUrl}/GetProduct/${id}`)
  }

  createProduct(product : CreateUpdateProduct) : Observable<any>{
    return this.http.post(`${this.ProductApiUrl}/createProduct`, product)
  }

  deleteProduct(id : number) : Observable<any> { 
    return this.http.delete(`${this.ProductApiUrl}/DeleteProduct/${id}`)
  }

}
