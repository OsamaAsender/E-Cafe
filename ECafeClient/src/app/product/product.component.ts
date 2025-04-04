import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/products/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products : Product[] = [];
  searchKey : string = '';

  constructor(
    private productSvc : ProductService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
   ) 
  { }


  ngOnInit(): void {
    this.loadProducts();
  }

  getImageUrl(product : Product) : string {
    const categoryName = product.categoryName.toLowerCase();
    let fullPath : string = 'products/';

    if (categoryName === 'gpu') {

      fullPath += `gpu/${product.imageName}`
    }
    else if (categoryName === 'laptop') {

      fullPath += `laptop/${product.imageName}`
    }
    else if (categoryName === 'peripheral') {

      fullPath += `peripheral/${product.imageName}`
    }


    return fullPath;
  }

  loadProducts() : void {
    this.spinner.show();

    this.productSvc.getProducts(this.searchKey).subscribe({
      next: (productsFromApi: Product[]) => {
        this.products = productsFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(`${err.message}`, 'Product');
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  deleteProduct(product: Product): void {

    let deleteDialog = this.dialog.open(DeleteProductDialogComponent, {
      data: product
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.productSvc.deleteProduct(product.id).subscribe({
            next: () => {

              this.toastr.success(`Product has been deleted successfully.`);
              this.loadProducts();
            },
            error: (err: HttpErrorResponse) => {

              this.toastr.error(err.message);
            },
            complete: () => {

              this.spinner.hide();
            }
          });
        }

      }
    });

  }
  searchProducts(): void {

    this.loadProducts();
  }

  clearSearch(): void {

    this.searchKey = "";
    this.loadProducts();
  }
  
} 
