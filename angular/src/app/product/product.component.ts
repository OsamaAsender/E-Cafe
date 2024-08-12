import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/products/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productSvc: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productSvc.getProducts().subscribe({
      next: (ProductsFromApi: Product[]) => {
        this.products = ProductsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message, 'Ok');
      },
    });
  }
}
