import { Gender } from "../../enums/gender.enum";
import { Order } from "../orders/order.model";

export interface CustomerDetails {
    id : number 
    firstName : string,
    lastName : string,
    phoneNumber : string ,
    gender : Gender,
    orders : Order[];
}