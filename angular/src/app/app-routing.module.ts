import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CreateUpdateCategoryComponent } from './category/create-update-category/create-update-category.component';
import { ProductComponent } from './product/product.component';
import { CreateUpdateProductComponent } from './product/create-update-product/create-update-product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CustomerComponent } from './customer/customer.component';
import { CreateUpdateCustomerComponent } from './customer/create-update-customer/create-update-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { OrderComponent } from './order/order.component';
import { CreateUpdateOrderComponent } from './order/create-update-order/create-update-order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'category',
    component:CategoryComponent
  },
  {
    path: 'category/create',
    component:CreateUpdateCategoryComponent
  },
  {
    path: 'category/details/:id',
    component:CategoryDetailsComponent
  },
  {
    path: 'category/edit/:id',
    component:CreateUpdateCategoryComponent
  },
  {
    path: 'product',
    component:ProductComponent
  },
  {
    path: 'product/create',
    component:CreateUpdateProductComponent
    
  },
  {
    path: 'product/details/:id',
    component:ProductDetailsComponent
  },
  {
    path: 'product/edit/:id',
    component:CreateUpdateProductComponent
  },
  {
    path: 'customer',
    component:CustomerComponent
  },
  {
    path: 'customer/create',
    component:CreateUpdateCustomerComponent
  },
  {
    path: 'customer/details/:id',
    component:CustomerDetailsComponent
  },
  {
    path: 'customer/edit/:id',
    component:CreateUpdateCustomerComponent
  },
  {
    path: 'order',
    component:OrderComponent
  },
  {
    path: 'order/create',
    component:CreateUpdateOrderComponent
  },
  {
    path: 'order/edit/:id',
    component:CreateUpdateOrderComponent
  },
  {
    path: 'order/details/:id',
    component:OrderDetailsComponent
  },
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: '**',
    component:PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
