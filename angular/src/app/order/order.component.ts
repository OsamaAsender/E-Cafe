import { Component } from '@angular/core';
import { Order } from '../models/orders/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { OrderStatus } from '../enums/order-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteOrderDialogComponent } from './delete-order-dialog/delete-order-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  dataSource = new MatTableDataSource<Order>([]);

  displayedColumns: string[] = ['id', 'customer', 'totalPrice', 'orderDate', 'orderStatus', 'note', 'actions'];

  orderStatusEnum = OrderStatus;

  constructor(
    private orderSvc: OrderService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.loadOrder();
  }

  deleteOrder(order: Order): void {

    let deleteDialog = this.dialog.open(DeleteOrderDialogComponent, {
      data: order
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.orderSvc.deleteOrder(order.id).subscribe({
            next: () => {

              this.toastr.success(`Order #${order.id} has been deleted successfully.`);
              this.loadOrder();
            },
            error: (err: HttpErrorResponse) => {

              this.toastr.error(err.message);
            },
            complete: () => {

              this.spinner.hide();
            }
          });
        }

      }
    });

  }


  private loadOrder(): void {

    this.spinner.show();

    this.orderSvc.getOrders().subscribe({
      next: (ordersFromApi: Order[]) => {

        this.dataSource.data = ordersFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(`${err.message}`, 'Order');
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }
}
