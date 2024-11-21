import { Component, Inject } from '@angular/core';
import { Order } from '../../models/orders/order.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-order-dialog',
  templateUrl: './delete-order-dialog.component.html',
  styleUrl: './delete-order-dialog.component.css'
})
export class DeleteOrderDialogComponent {
  constructor(
    dialogRef: MatDialogRef<DeleteOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order
  ){}
}
