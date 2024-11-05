import { Gender } from "../../enums/gender.enum";

export interface CustomerDetails {
    id : number 
    fullName : string,
    phoneNumber : string ,
    gender : Gender,
    // orders : Order[];
}