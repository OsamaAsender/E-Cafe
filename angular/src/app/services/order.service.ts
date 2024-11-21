import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUpdateOrder } from '../models/orders/create-update-order.model';
import { Order } from '../models/orders/order.model';
import { OrderDetails } from '../models/orders/orderDetails.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderApiUrl : string = 'https://localhost:7045/api/Orders'

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {

    return this.http.get<Order[]>(`${this.orderApiUrl}/GetOrders`);
  }

  getOrder(id: number): Observable<OrderDetails> {

    return this.http.get<OrderDetails>(`${this.orderApiUrl}/GetOrder/${id}`);
  }

  getOrderForEdit(id: number): Observable<CreateUpdateOrder> {

    return this.http.get<CreateUpdateOrder>(`${this.orderApiUrl}/GetOrderForEdit/${id}`);
  }

  createOrder(order: CreateUpdateOrder): Observable<any> {

    return this.http.post<CreateUpdateOrder>(`${this.orderApiUrl}/CreateOrder`, order);
  }

  updateOrder(id: number, order: CreateUpdateOrder): Observable<any> {

    return this.http.put<CreateUpdateOrder>(`${this.orderApiUrl}/EditOrder/${id}`, order);
  }

  deleteOrder(id: number): Observable<any> {

    return this.http.delete(`${this.orderApiUrl}/DeleteOrder/${id}`);
  }
}
