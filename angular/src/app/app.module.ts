import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { MatCardModule } from '@angular/material/card';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import { ProductComponent } from './product/product.component';
import { CreateUpdateProductComponent } from './product/create-update-product/create-update-product.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StarRatingModule } from 'angular-star-rating';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteProductDialogComponent } from './product/delete-product-dialog/delete-product-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { DeleteCategoryDialogComponent } from './category/delete-category-dialog/delete-category-dialog.component';
import { CreateUpdateCategoryComponent } from './category/create-update-category/create-update-category.component';
import {MatTableModule} from '@angular/material/table';
import { CustomerComponent } from './customer/customer.component';
import { CreateUpdateCustomerComponent } from './customer/create-update-customer/create-update-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { DeleteCustomerDialogComponent } from './customer/delete-customer-dialog/delete-customer-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    CategoryComponent,
    CreateUpdateCategoryComponent,
    CategoryDetailsComponent,
    ProductComponent,
    CreateUpdateProductComponent,
    ProductDetailsComponent,
    DeleteProductDialogComponent,
    DeleteCategoryDialogComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    CreateUpdateCustomerComponent,
    DeleteCustomerDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    ToastrModule.forRoot(),
    StarRatingModule.forRoot()
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
