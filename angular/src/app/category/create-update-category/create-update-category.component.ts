import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageMode } from '../../enums/page-mode.enum';
import { CreateUpdateCategory } from '../../models/categories/createupdatecategory.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../models/categories/category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-update-category',
  templateUrl: './create-update-category.component.html',
  styleUrl: './create-update-category.component.css'
})
export class CreateUpdateCategoryComponent implements OnInit {
  form! : FormGroup;
  
  thePageMode : PageMode = PageMode.Create;
  pageModeEnum = PageMode;
  
  categoryId!: number;
  category?: CreateUpdateCategory;

  constructor(
    private fb : FormBuilder,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private categorySvc : CategoryService,
    private snackBar : MatSnackBar,
    private spinner : NgxSpinnerService,
    private toastr : ToastrService
  ) 
  { }
  ngOnInit(): void {
    this.setProductId();
    this.BuildForm();

    if(this.thePageMode === PageMode.Update){
      this.loadCategory();
    }
  }
  submit() : void{
    if(this.form.valid){

      if(this.thePageMode === this.pageModeEnum.Create){
        this.createCategory();
      }
      else
      {
        this.updateProduct();
      }
    }
  }
  
  //#region private Methods

  private setProductId() {

    if(this.activatedRoute.snapshot.paramMap.get('id')){
      this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.thePageMode = this.pageModeEnum.Update;
    }
    
  }

  private BuildForm() : void {
    this.form = this.fb.group({
      id:[0],
      name:['',Validators.required],
      description:['',Validators.required],
    })
  }

  private loadCategory() {

    this.spinner.show();
    this.categorySvc.getCategoryForEdit(this.categoryId).subscribe({
     next : (categoriesFromApi : Category) => {
       this.form.patchValue(categoriesFromApi)
       this.category = categoriesFromApi
     },
     error : (err: HttpErrorResponse) => {
       this.snackBar.open(err.message);
       this.spinner.hide();
     },
     complete: () => {
       this.spinner.hide();
     }
    })
   }

  private updateProduct() {
    this.spinner.show();
    this.categorySvc.updateCategory(this.form.value).subscribe({
      next:() => {
        
        this.router.navigate(['/category']);
        this.toastr.show(`You Updated ${this.category?.name} :)`,'Ok')
      }, error : (err: HttpErrorResponse) => {
        this.snackBar.open(`ERROR: ${err.message}`, "Ok");
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }
  
  private createCategory() {
    this.spinner.show();
    this.categorySvc.createCategory(this.form.value).subscribe({
      next:() => {
        this.spinner.hide();
        this.snackBar.open("You Added A New Category :)",'Ok')
        this.router.navigate(['/category']);
      }
    })
  }

  

 
 
  //#endregion
}
