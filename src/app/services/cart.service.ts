import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  quantityarray:Array<any>=[]
  constructor(private http: HttpClient) { }
  getcartList() {
    return this.http.get('http://127.0.0.1:8000/api/cart');
  }
  deletecart(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/cart/'+id);
  }
  insertdate(data: any,id:any){
    // this.quantityarray[id]=1
    // console.log(this.quantityarray)
    return this.http.post('http://127.0.0.1:8000/api/cart',data);
  }
  getData(id:any){
    return this.http.get('http://127.0.0.1:8000/api/cart/'+id);
  }
  updatecart(id: any,data:any){
    return this.http.put('http://127.0.0.1:8000/api/cart/'+id,data);
  }
  decreaseQuantity(indexItem: number) {
    if (this.quantityarray[indexItem] > 1)
      this.quantityarray[indexItem]--;
      console.log(this.quantityarray)
  }

  increaseQuantity(indexItem: number) {
   
      this.quantityarray[indexItem]++;
  }
}
