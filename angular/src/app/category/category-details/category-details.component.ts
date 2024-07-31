import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Categorydetails } from '../../models/categories/categorydetails.model';
import { Category } from '../../models/categories/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {

  categoryId !: number ;
  categoryDetails !: Categorydetails;
  Categories : Category[] = [];

 constructor(
  private categorySvc : CategoryService,
  private activatedRoute : ActivatedRoute,
  private Snackbar : MatSnackBar
) { }

  ngOnInit(): void {
    this.setCategoryId();
    this.LoadCategoryDetails();
    this.loadCategories();
  }


  //Region Private Methods
  private setCategoryId(){

    if(this.activatedRoute.snapshot.paramMap.get('id')){
      
      this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('id')) ;
    }
  }

  private LoadCategoryDetails() : void {

    this.categorySvc.getCategory(this.categoryId).subscribe({
      next: ( categoryDetailsFromApi : Categorydetails) =>{
        this.categoryDetails = categoryDetailsFromApi;
      },
      error : (err : HttpErrorResponse) => {
        this.Snackbar.open(err.message);
      }
    })

  }

  private loadCategories(): void{
    this.categorySvc.getCategories().subscribe({
      next : (categoriesFromApi : Category[]) => {
        this.Categories = categoriesFromApi;
      }
    })
  }



}
