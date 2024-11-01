import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products/product.model';
import { Observable } from 'rxjs';
import { CreateUpdateProduct } from '../models/products/createupdateproduct.model';
import { ProductDetails } from '../models/products/productdetails.model';
import { PagedList } from '../models/pagers/pagedList.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private ProductApiUrl : string = "https://localhost:7045/api/Products";

  constructor(private http : HttpClient) { }

  getProducts() : Observable<Product[]>{

    return this.http.get<Product[]>(`${this.ProductApiUrl}/GetProducts`);
  }

  getPagedProducts( pageIndex : number, pageSize :number ) : Observable<PagedList<Product>>{

    return this.http.get<PagedList<Product>>(`${this.ProductApiUrl}/GetPagedProducts?pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }

  getProduct(id : number) : Observable<ProductDetails>{
    
    return this.http.get<ProductDetails>(`${this.ProductApiUrl}/GetProduct/${id}`)
  }

  getProductForEdit(id : number) : Observable<CreateUpdateProduct>{

    return this.http.get<CreateUpdateProduct>(`${this.ProductApiUrl}/GetProductForEdit/${id}`)
  }
  
  updateProduct( product : CreateUpdateProduct) : Observable<any>{
    return this.http.put(`${this.ProductApiUrl}/EditProduct/${product.id}`, product)
  }

  createProduct(product : CreateUpdateProduct) : Observable<any>{
    return this.http.post(`${this.ProductApiUrl}/createProduct`, product)
  }

  deleteProduct(id : number) : Observable<any> { 
    return this.http.delete(`${this.ProductApiUrl}/DeleteProduct/${id}`)
  }

}
