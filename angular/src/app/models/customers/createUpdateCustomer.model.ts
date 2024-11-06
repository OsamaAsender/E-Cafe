import { Gender } from "../../enums/gender.enum";

export interface CreateUpdateCustomer {

    id : number ,
    fullName: string,
    phoneNumber: string,
    gender : Gender

}