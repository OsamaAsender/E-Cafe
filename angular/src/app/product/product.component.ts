import { AfterViewInit, Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/products/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PagedList } from '../models/pagers/pagedlist.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit , AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Product>([]);
  totalItems : number = 0;

  displayedColumns: string[] = ['name', 'price', 'rating', 'categoryName','actions'];


  constructor(
    private productSvc: ProductService,
    private snackBar: MatSnackBar,
    private spinner : NgxSpinnerService,
  ) { }
 

  ngOnInit(): void {
   this.loadProducts(0, 5);
  }

  ngAfterViewInit(): void {
    this.setupPager();
  }
   
//#region Private Methods
private setupPager() {
  this.paginator.page.pipe(
    tap( () => this.loadProducts(this.paginator.pageIndex, this.paginator.pageSize))
  ).subscribe();
}

  private loadProducts(pageIndex : number, pageSize: number) :void {

    this.spinner.show();
    this.productSvc.getPagedProducts(pageIndex, pageSize).subscribe({
      next: (PagedProductsFromApi: PagedList<Product>) => {
        
        this.dataSource.data = PagedProductsFromApi.items;
        this.totalItems = PagedProductsFromApi.totalItems;

        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message, 'Ok');
        this.spinner.hide();
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
              this.loadProducts(0, 5);
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
