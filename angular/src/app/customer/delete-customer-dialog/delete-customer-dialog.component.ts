import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../../category/delete-category-dialog/delete-category-dialog.component';
import { Customer } from '../../models/customers/customer.model';

@Component({
  selector: 'app-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styleUrl: './delete-customer-dialog.component.css'
})
export class DeleteCustomerDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public customer: Customer
  ) { }

  
}
