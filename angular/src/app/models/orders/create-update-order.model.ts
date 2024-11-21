import { CreateUpdateOrderProduct } from "./createUpdateOrderProduct.model";

export interface CreateUpdateOrder {
    id : number,
    note : string,
    orderProducts: CreateUpdateOrderProduct[],
    customerId: number
}