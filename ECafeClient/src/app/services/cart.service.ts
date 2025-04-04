import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment.development";
import { CartItemInput } from "../model/carts/cart-item-input.model";
import { Cart } from "../model/carts/cart.model";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartApiUrl = `${environment.apiUrl}Cart`;

  constructor(private http: HttpClient) { }

  getCart(): Observable<Cart> {

    return this.http.get<Cart>(`${this.cartApiUrl}/GetCart`);
  }

  addToCart(cartItem: CartItemInput): Observable<any> {

    return this.http.post(`${this.cartApiUrl}/AddToCart`, cartItem);
  }
}
