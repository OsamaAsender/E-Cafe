import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageMode } from '../../enums/page-mode.enum';
import { CreateUpdateCustomer } from '../../models/customers/createUpdateCustomer.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customers/customer.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrl: './create-update-customer.component.css'
})
export class CreateUpdateCustomerComponent {

  form! : FormGroup;
  
  thePageMode : PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  customerId! : number;
  customer?: CreateUpdateCustomer;

  constructor(
    private fb : FormBuilder,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private customerSvc : CustomerService,
    private snackBar : MatSnackBar,
    private spinner : NgxSpinnerService,
    private toastr : ToastrService
  ) { }


  ngOnInit(): void { 

    this.setCustomerId();
    this.BuildFrom();

    if(this.thePageMode === PageMode.Update){
      this.loadCustomers();
    }
  }
  
  submit() : void {
    if(this.thePageMode == this.pageModeEnum.Create){
      this.createCustomer();
    }else{
      this.editCustomer();
    }
  }
 
 
  
  //#region private Methods

  
  private setCustomerId() {
    if(this.activatedRoute.snapshot.paramMap.get('id')){
      this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.thePageMode = this.pageModeEnum.Update;
    }
  } 

  private BuildFrom() : void {
    this.form = this.fb.group({
      id:[0],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      phoneNumber:['',Validators.required],
      gender:['',Validators.required],
    })
  }

  private loadCustomers() {
    this.spinner.show();
    this.customerSvc.getCustomerForEdit(this.customerId).subscribe({
      next: ( customerFromApi : CreateUpdateCustomer) => {
        this.form.patchValue(customerFromApi)
        this.customer = customerFromApi;
      },
      error : (err : HttpErrorResponse) => {
        this.snackBar.open(err.message);
        this.spinner.hide();
      },
      complete : () => {
        this.spinner.hide();
      }
    })
  }

  private editCustomer() { 
    this.spinner.show();
    this.customerSvc.editCustomer(this.customerId, this.form.value).subscribe({
      next:() => {
        this.router.navigate(['/customer']);
      },
      error : (err : HttpErrorResponse) => {
        this.toastr.show(`Error: ${err.message}`,'Ok');
      },
      complete : () => {
        this.spinner.hide();
        this.router.navigate(['/customer'])
        this.loadCustomers();
      }
    })

  }

  private createCustomer() {
    this.spinner.show();

    this.customerSvc.createCustomer(this.form.value).subscribe({
      next: () => {
        this.spinner.hide();
        this.snackBar.open("Customer Added Successfully","Ok")
        this.router.navigate(['/customer']);
      },
      error : (err : HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    })
  }

  //#endregion

}