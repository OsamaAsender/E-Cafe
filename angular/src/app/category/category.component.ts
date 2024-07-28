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

}
