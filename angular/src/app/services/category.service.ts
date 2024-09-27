import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categories/category.model';
import { Categorydetails } from '../models/categories/categorydetails.model';
import { CreateUpdateCategory } from '../models/categories/createupdatecategory.model';
import { Lookup } from '../models/Lookup/lookup.model';
import { PagedList } from '../models/pagers/pagedlist.model';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private CategoryApiUrl : string = "https://localhost:7045/api/Categories";

  constructor(private http : HttpClient) { }

  getCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(`${this.CategoryApiUrl}/GetCategories`)
  }

  getPagedCategories(pageSize : number , pageIndex : number) : Observable<PagedList<Category>[]>{
    return this.http.get<PagedList<Category>[]>(`${this.CategoryApiUrl}/GetPagedCategories?pageSize=${pageSize}&pageIndex=${pageIndex}`)
  }

  getCategory(id : number) : Observable<Categorydetails>{
    return this.http.get<Categorydetails>(`${this.CategoryApiUrl}/GetCategory/${id}`)
  }

  getCategoryForEdit(id : number) : Observable<CreateUpdateCategory>{
    return this.http.get<CreateUpdateCategory>(`${this.CategoryApiUrl}/GetCategoryForEdit/${id}`)
  }

  createCategory(category : CreateUpdateCategory) : Observable<any>{
    return this.http.post(`${this.CategoryApiUrl}/createCategory`, category)
  }

  updateCategory(category : CreateUpdateCategory) : Observable<any>{
    return this.http.put(`${this.CategoryApiUrl}/EditCategory/${category.id}`,category)
  }

  deleteCategory(id : number) : Observable<any> { 
    return this.http.delete(`${this.CategoryApiUrl}/DeleteCategory/${id}`)
  }

  getCategoryLookup() : Observable<Lookup[]>{
    return this.http.get<Lookup[]>(`${this.CategoryApiUrl}/GetCategoryLookup`);
  }
}
