import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.css'
})
export class CreateUpdateProductComponent implements OnInit {       //OnInit is a event 
  

  form! : FormGroup;

  constructor(
    private fb : FormBuilder,
    private productSvc : ProductService,
    private router : Router,
    private snackBar : MatSnackBar,
    private spinner : NgxSpinnerService
  ) {}
    

  ngOnInit(): void {
    this.BuildForm();
  }


  submit() : void{
   if(this.form.valid){
     this.createProduct();
   }
  }

  //#region Private Methods

  private BuildForm() : void { 
    this.form = this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required],
      rating:['',Validators.required],
      price:['',Validators.required],
      categoryId:['',Validators.required]
    })
   }

   createProduct() : void {
    this.spinner.show();
    this.productSvc.createProduct(this.form.value).subscribe({
      next:() => {
        this.spinner.hide();
        this.snackBar.open("You Added A New Product :)",'Ok')
        this.router.navigate(['/product']);
      }
    })
   }
  //#endregion

}