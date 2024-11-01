import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../models/categories/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { PagedList } from '../models/pagers/pagedList.model';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit , AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly dialog = inject(MatDialog);

  categories : Category[] = []

  dataSource = new MatTableDataSource<Category>([]);
  totalItems : number = 0;

  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(
    private categorySvc : CategoryService,
    private snackBar: MatSnackBar,
    private spinner : NgxSpinnerService,
  ) { }

  
  ngOnInit(): void {
    this.loadCategories(0, 5);
  }
  
  ngAfterViewInit(): void {
   this.setUpPager();
  }

//#region private Methods

  private setUpPager() {
    this.paginator.page.pipe(
      tap( () => this.loadCategories(this.paginator.pageIndex, this.paginator.pageSize))
    ).subscribe();
  }

  
  private loadCategories( pageSize: number , pageIndex : number) :void {

    this.spinner.show();
    this.categorySvc.getPagedCategories(pageIndex, pageSize).subscribe({
      next:(PagedcategoriesfromApi : PagedList<Category>) => {

        this.dataSource.data = PagedcategoriesfromApi.items;
        this.totalItems = PagedcategoriesfromApi.totalItems;

        this.spinner.hide();
      },
      error : (err : HttpErrorResponse) => {
        this.snackBar.open(err.message, 'Ok');
        this.spinner.hide();
      }
    });

  }

  deleteCategory(categoryFromUI : Category) : void {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, { 
      data : categoryFromUI 
    });
    dialogRef.afterClosed().subscribe({
      next:(answere : boolean) => {
        if(answere){
          this.categorySvc.deleteCategory(categoryFromUI.id).subscribe({
            next : () => {
              this.loadCategories(5 ,0);
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

