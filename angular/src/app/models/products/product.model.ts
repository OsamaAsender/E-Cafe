import { Category } from "../categories/category.model";

export interface Product{
    id : number,
    name : string,
    price : number,
    rating : number,
    categoryName : Category
}