import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customers/customer.model';
import { CustomerDetails } from '../models/customers/customerDetails.model';
import { CreateUpdateCustomer } from '../models/customers/createUpdateCustomer.model';
import { Lookup } from '../models/Lookup/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerApiUrl : string = 'https://localhost:7045/api/Customers'

  constructor(private http : HttpClient) { }

  getCustomerLookup() : Observable<Lookup[]>{
    return this.http.get<Lookup[]>(`${this.customerApiUrl}/GetCustomerLookup`);
  }

  getCustomers() : Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.customerApiUrl}/GetCustomers`)
  }

  getCustomer(id : number) : Observable<CustomerDetails>{
    return this.http.get<CustomerDetails>(`${this.customerApiUrl}/GetCustomer/${id}`)
  }
  
  getCustomerForEdit(id : number) : Observable<CreateUpdateCustomer>{
    return this.http.get<CreateUpdateCustomer>(`${this.customerApiUrl}/GetCustomerForEdit/${id}`)
  }
  
  createCustomer (customer : CreateUpdateCustomer) : Observable<any>{
    return this.http.post<CreateUpdateCustomer>(`${this.customerApiUrl}/CreateCustomer`,customer)
  } 
  
  editCustomer (id : number ,customer : CreateUpdateCustomer) : Observable<any>{
    return this.http.put<CreateUpdateCustomer>(`${this.customerApiUrl}/EditCustomer/${id}`,customer)
  } 

  deleteCustomer(id : number) : Observable<any> { 
    return this.http.delete<any>(`${this.customerApiUrl}/DeleteCustomer/${id}`)
  }
}
