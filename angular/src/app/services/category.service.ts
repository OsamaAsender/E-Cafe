import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categories/category.model';
import { Categorydetails } from '../models/categories/categorydetails.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private CategoryApiUrl : string = "https://localhost:7045/api/Categories";

  constructor(private http : HttpClient) { }

  getCategories() : Observable<Category[]>{

    return this.http.get<Category[]>(`${this.CategoryApiUrl}/GetCategories`)
  }

  getCategory(id : number) : Observable<Categorydetails>{

    return this.http.get<Categorydetails>(`${this.CategoryApiUrl}/GetCategory/${id}`)
  }
  
}
