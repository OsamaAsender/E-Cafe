import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/products/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  readonly dialog = inject(MatDialog);

  constructor(
    private productSvc: ProductService,
    private snackBar: MatSnackBar,
    private spinner : NgxSpinnerService,
  ) {}

  ngOnInit(): void {
   this.getProducts();
  }

  //#region Private Functions
  private getProducts() :void {

    this.spinner.show();
    this.productSvc.getProducts().subscribe({
      next: (ProductsFromApi: Product[]) => {
        this.products = ProductsFromApi;
        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message, 'Ok');
      },
    });
  }

   deleteProduct(productFromUI : Product) : void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, { 
      data : productFromUI 
    });
    dialogRef.afterClosed().subscribe({
      next:(answere : boolean) => {
        if(answere){
          this.productSvc.deleteProduct(productFromUI.id).subscribe({
            next : () => {
              this.getProducts();
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

//#endregion
}
