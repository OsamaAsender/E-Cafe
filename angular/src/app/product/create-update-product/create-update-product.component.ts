import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../models/products/product.model';
import { PageMode } from '../../enums/page-mode.enum';
import { CreateUpdateProduct } from '../../models/products/createupdateproduct.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { Lookup } from '../../models/Lookup/lookup.model';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.css'
})
export class CreateUpdateProductComponent implements OnInit {       //OnInit is a event 
  form! : FormGroup;
  
  thePageMode : PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  categoryLookup : Lookup[] = [];

  productId!: number;
  product?: CreateUpdateProduct;

  constructor(
    private fb : FormBuilder,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private productSvc : ProductService,
    private snackBar : MatSnackBar,
    private spinner : NgxSpinnerService,
    private toastr : ToastrService,
    private categorySvc: CategoryService
  ) {}
    
  ngOnInit(): void {
    this.loadCategoryLookup();
    this.setProductId();
    this.BuildForm();

    if(this.thePageMode === PageMode.Update){
      this.loadProduct();
    }
  }

  submit() : void{
    if(this.form.valid){

      if(this.thePageMode === this.pageModeEnum.Create){
        this.createProduct();
      }

      else
      {
        this.updateProduct();
      }
    }
  }

  //#region Private Methods
  
  get priceControl(){
    return this.form.controls["price"];
  }

  private loadCategoryLookup() : void { 
    this.spinner.show();
    this.categorySvc.getCategoryLookup().subscribe({
      next : (categoryLookupFromApi : Lookup[]) => {
        this.categoryLookup = categoryLookupFromApi;
      }, error : (err: HttpErrorResponse) => {
        this.snackBar.open(`ERROR: ${err.message}`, "Ok");
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }
  
  private setProductId() : void{
    
    if(this.activatedRoute.snapshot.paramMap.get('id')){
      
      this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.thePageMode = PageMode.Update;
    }
  }
  
  private BuildForm() : void { 
    this.form = this.fb.group({
      id:[0],
      name:['',Validators.required],
      description:['',Validators.required],
      rating:[0],
      price:['',[Validators.required,Validators.max(99.9)]],
      categoryId:[0,Validators.required]
    })
  }
  
  private loadProduct() : void{
    
    this.spinner.show();
    
    this.productSvc.getProductForEdit(this.productId).subscribe({
      
      next:(productFromApi : CreateUpdateProduct) =>{
        this.form.patchValue(productFromApi)
        this.product = productFromApi;
      },
      error:(err: HttpErrorResponse) => {
        this.snackBar.open(err.message)
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }
  
  private createProduct() : void {
    this.spinner.show();
    this.productSvc.createProduct(this.form.value).subscribe({
      next:() => {
        this.spinner.hide();
        this.snackBar.open("You Added A New Product :)",'Ok')
        this.router.navigate(['/product']);
      }
    })
  }
  
  private updateProduct() : void {
    this.spinner.show();
    this.productSvc.updateProduct(this.form.value).subscribe({
      next:() => {
        
        this.router.navigate(['/product']);
        this.toastr.show(`You Updated ${this.product?.name} :)`,'Ok')
      }, error : (err: HttpErrorResponse) => {
        this.snackBar.open(`ERROR: ${err.message}`, "Ok");
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }


  //#endregion
}
