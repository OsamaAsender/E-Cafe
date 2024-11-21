import { OrderStatus } from "../../enums/order-status.enum";

export interface Order{
    id : number ,
    orderDate: string,
    note : string,
    totalPrice: number,
    orderStatus: OrderStatus,
    customerFullName: string
}
