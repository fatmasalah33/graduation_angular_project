import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import{CartItem} from '../cart-item'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount =  new BehaviorSubject(1);
  count:any
  constructor(private http: HttpClient) {
    if(localStorage.getItem('cart_count')){
      this.count=localStorage.getItem('cart_count')
  
      this.cartCount.next(JSON.parse(this.count))
    }
   }
  setCartCount(count: number) {
    localStorage.setItem("cart_count", JSON.stringify(count));
    this.count=count
    this.cartCount.next(count);
  }
  getcartList(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/cart')
  }
  deletecart(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/cart/'+id);
  }
  insertdate(data: any){
  
    return this.http.post('http://127.0.0.1:8000/api/cart',data);
  }
  getData(id:any):Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/cart/'+id);
  }
  updatecart(id: any,data:any){
    return this.http.put('http://127.0.0.1:8000/api/cart/'+id,data);
  }
gettotalprice(id:any):Observable<any>{
  return this.http.get('http://127.0.0.1:8000/api/totalprice/'+id);
}
gettotalitem(id:any):Observable<any>{
  return this.http.get('http://127.0.0.1:8000/api/totalitem/'+id);
}
}
