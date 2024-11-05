import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { NgxSpinnerService } from "ngx-spinner";
import { tap } from "rxjs";
import { Customer } from "../models/customers/customer.model";
import { PagedList } from "../models/pagers/pagedList.model";
import { CustomerService } from "../services/customer.service";
import { DeleteCustomerDialogComponent } from "./delete-customer-dialog/delete-customer-dialog.component";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {

  customers : Customer[] = []

  dataSource = new MatTableDataSource<Customer>([]);
  totalItems : number = 0;

  displayedColumns: string[] = ['fullName', 'phoneNumber', 'gender', 'actions'];

  constructor(
    private customerSvc : CustomerService,
    private snackBar: MatSnackBar,
    private spinner : NgxSpinnerService,
    private dialog : MatDialog


  ) { }

  
  ngOnInit(): void {
    this.loadCustomers();
  }
  

//#region private Methods

  
  private loadCustomers() :void {

    this.spinner.show();
    this.customerSvc.getCustomers().subscribe({
      next:(customersfromApi : Customer[]) => {

        this.dataSource.data = customersfromApi;

        this.spinner.hide();
      },
      error : (err : HttpErrorResponse) => {
        this.snackBar.open(err.message, 'ok');
        this.spinner.hide();
      }
    });

  }

  deleteCustomer(customerFromUI : Customer) : void {
    const dialogRef = this.dialog.open(DeleteCustomerDialogComponent, { 
      data : customerFromUI 
    });
    dialogRef.afterClosed().subscribe({
      next:(answere : boolean) => {
        if(answere){
          this.customerSvc.deleteCustomer(customerFromUI.id).subscribe({
            next : () => {
              this.loadCustomers();
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