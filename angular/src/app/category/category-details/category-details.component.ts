import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Categorydetails } from '../../models/categories/categorydetails.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {

  categoryId !: number ;
  categoryDetails !: Categorydetails;

 constructor(
  private categorySvc : CategoryService,
  private activatedRoute : ActivatedRoute
) { }

  ngOnInit(): void {
    this.setCategoryId();
    this.LoadCategoryDetails();
  }


  //Region Private Methods
  private setCategoryId(){

    if(this.activatedRoute.snapshot.paramMap.get('id')){
      
      this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('id')) ;
    }
  }

  private LoadCategoryDetails() : void {

    this.categorySvc.getCategory(this.categoryId).subscribe({
      next: ( categoryDetailsFromApi : Categorydetails) =>{
        this.categoryDetails = categoryDetailsFromApi;
      }
    })

  }



}