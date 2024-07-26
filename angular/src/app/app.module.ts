import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import { CreateUpdateCategoryComponent } from './category/create-update-category/create-update-category.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HomeComponent,
    PageNotFoundComponent,
    CreateUpdateCategoryComponent,
    CategoryDetailsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
