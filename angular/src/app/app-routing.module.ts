import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUpdateCategoryComponent } from './category/create-update-category/create-update-category.component';

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
    component:CategoryComponent
  },
  {
    path: 'category/edit/:id',
    component:CreateUpdateCategoryComponent
  },
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
