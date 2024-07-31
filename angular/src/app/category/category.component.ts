import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../models/categories/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {

  categories : Category[] = [];
  path : string ='' ;
  constructor(
    private categorySvc : CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  
    this.categorySvc.getCategories().subscribe({
      next:(categoriesfromApi : Category[]) => {
        this.categories = categoriesfromApi;
      },
      error : (err : HttpErrorResponse) => {
        this.snackBar.open(err.message , "Ok")
      }
    });

  }


  getImageUrl(category : Category) : string {
    const categoryName = category.name.toLowerCase();
    let fullPath : string = 'categories/';

    if(categoryName === 'hotdrink'){
      fullPath += `hotdrinks/${category.imageName}`
    }
    else if(categoryName === 'softdrink'){
      fullPath += `softdrinks/${category.imageName}`
    }
    else if(categoryName === 'cheesecakes'){
      fullPath += `cheesecakes/${category.imageName}`
    }
    else if(categoryName === 'milkshake'){
      fullPath += `milkshakes/${category.imageName}`
    }
    else if(categoryName === 'waffle'){
      fullPath += `waffles/${category.imageName}`
    }
    else if(categoryName === 'crepe'){
      fullPath += `crepes/${category.imageName}`
    }

    return fullPath;
  }


}
