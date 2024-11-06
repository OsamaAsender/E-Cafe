import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomerDetails } from '../../models/customers/customerDetails.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  customerId! : number;
  customerDetails!: CustomerDetails ;

  constructor(
   private customerSvg : CustomerService,
   private activatedRoute : ActivatedRoute,
   private Snackbar : MatSnackBar
  ){}

  ngOnInit(): void {

    this.setCustomerId();
    
  }


  //#region Private Funcitons
  private setCustomerId() : void {
    
  // if(this.activatedRoute.snapshot.paramMap.get('id')){
  //   this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  // }

  this.activatedRoute.paramMap.subscribe({
    next : (paramMap : ParamMap) => {
      this.customerId = Number(paramMap.get('id'));
      this.loadCustomerDetails();
    },
    error : () => {
      
    }
  })
  }

  private loadCustomerDetails() : void {
    this.customerSvg.getCustomer(this.customerId).subscribe({
      next: (CustomerFromApi : CustomerDetails) =>{
        this.customerDetails = CustomerFromApi;
      },
      error : (err : HttpErrorResponse) => {
        this.Snackbar.open(err.message,"Ok");
      }
    })
  }
}
