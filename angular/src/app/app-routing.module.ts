import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';

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
    // component:CategoryComponent
  },
  {
    path: 'category/details/:id',
    // component:CategoryComponent
  },  {
    path: 'category/edit/:id',
    // component:CategoryComponent
  },  {
    path: 'category',
    // component:CategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
