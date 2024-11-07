import { Component, OnInit } from '@angular/core';
import { PageMode } from '../../enums/page-mode.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-create-update-order',
  templateUrl: './create-update-order.component.html',
  styleUrl: './create-update-order.component.css'
})
export class CreateUpdateOrderComponent implements OnInit{

  form! : FormGroup;

  pageMode : PageMode = PageMode.Create
  pageModeEnum = PageMode;

  orderId! : number ;
  order? : CreateUpdateOrderComponent;

  constructor(
  ){ }

  ngOnInit(): void {
  }


  
  // #region Private Methods

  private loadOrder() {
    throw new Error('Method not implemented.');
  }

  private loadLookups(): void {
    this.loadCustomerLookup();
    this.loadProductLookup();
  }

  private loadProductLookup() : void {


  }

  private loadCustomerLookup(){

  }

  private setId() {
    throw new Error('Method not implemented.');
  }
  private buildform() {
    throw new Error('Method not implemented.');
  }

//#endregion

}
