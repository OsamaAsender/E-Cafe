import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetails } from '../../models/products/productdetails.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productId! : number;
  productDetails!: ProductDetails ;

  constructor(
   private productSvg : ProductService,
   private activatedRoute : ActivatedRoute,
   private Snackbar : MatSnackBar
  ){}

  ngOnInit(): void {

    this.setProductId();
    this.loadProductDetails();
  }


  //#region Private Funcitons
  private setProductId() : void {
  if(this.activatedRoute.snapshot.paramMap.get('id')){
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  }

  private loadProductDetails() : void {
    this.productSvg.getProduct(this.productId).subscribe({
      next: (ProductFromApi : ProductDetails) =>{
        this.productDetails = ProductFromApi;
      },
      error : (err : HttpErrorResponse) => {
        this.Snackbar.open(err.message,"Ok");
      }
    })
  }
//#endregion

}