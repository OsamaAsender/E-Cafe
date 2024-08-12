import { Product } from "../products/product.model";

export interface Categorydetails {
    id : number,
    name : string,
    description : string,
    products : Product[] ,
}