import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import{CartItem} from '../cart-item'
@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) { }
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
