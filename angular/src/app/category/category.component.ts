import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../models/categories/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {

  categories : Category[] = [];
  readonly dialog = inject(MatDialog);
  pageSize : number = 5;
  pageIndex : number = 0;


  constructor(
    private categorySvc : CategoryService,
    private snackBar: MatSnackBar,
    private spinner : NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.getCategories();

  }

  private getCategories() :void {
    this.spinner.show();
    this.categorySvc.getCategories().subscribe({
      next:(categoriesfromApi : Category[]) => {
        this.categories = categoriesfromApi;
        this.spinner.hide();
      },
      error : (err : HttpErrorResponse) => {
        this.snackBar.open(err.message)
      }
    });

  }

  deleteCategory(categoryFromUI : Category) : void {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, { 
      data : categoryFromUI 
    });
    dialogRef.afterClosed().subscribe({
      next:(answere : boolean) => {
        if(answere){
          this.categorySvc.deleteCategory(categoryFromUI.id).subscribe({
            next : () => {
              this.getCategories();
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(err.message, 'Ok');
            },
          })
        }
      },
       error:() => {

      }
    })
  }

  }


