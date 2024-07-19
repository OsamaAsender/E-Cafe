import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categories/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getCategories() : Observable<Category[]>{

    return this.http.get<Category[]>("https://localhost:7045/api/Categories/GetCategories")
  
  }
}
