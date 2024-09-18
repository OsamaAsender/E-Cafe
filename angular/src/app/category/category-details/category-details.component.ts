import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Categorydetails } from '../../models/categories/categorydetails.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {

  categoryId !: number ;
  categoryDetails !: Categorydetails;

 constructor(
  private categorySvc : CategoryService,
  private activatedRoute : ActivatedRoute,
  private Snackbar : MatSnackBar,
  private spinner : NgxSpinnerService,
  private dialog : MatDialog
) { }

  ngOnInit(): void {
    this.setCategoryId();
    this.LoadCategoryDetails();
  }


  //Region Private Methods
  private setCategoryId(){

    if(this.activatedRoute.snapshot.paramMap.get('id')){
      
      this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('id')) ;
    }
  }

  private LoadCategoryDetails() : void {
    this.spinner.show();
    this.categorySvc.getCategory(this.categoryId).subscribe({
      next: ( categoryDetailsFromApi : Categorydetails) =>{
        this.categoryDetails = categoryDetailsFromApi;
        this.spinner.hide();
      },
      error : (err : HttpErrorResponse) => {
        this.Snackbar.open(err.message,"Ok");
      }
    })

  }
}