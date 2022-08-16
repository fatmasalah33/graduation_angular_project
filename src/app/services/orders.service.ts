import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) {}
  getOrdersList() {
    return this.http.get('http://127.0.0.1:8000/api/orders');
  }
  deleteOrders(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/orders/'+id);
  }
  insertdate(data: any){
    return this.http.post('http://127.0.0.1:8000/api/orders',data);
  }
  getData(id:any){
    return this.http.get('http://127.0.0.1:8000/api/orders/'+id);
  }
  updateOrders(id: any,data:any){
    return this.http.put('http://127.0.0.1:8000/api/orders/'+id,data);
  }
  getstates(){
    return this.http.get('http://127.0.0.1:8000/api/states');
  }
  getcities(id:any){
    return this.http.get('http://127.0.0.1:8000/api/cities/'+id);
  }
  getorderofuser(id:any){
    return this.http.get('http://127.0.0.1:8000/api/order/'+id);
  }

  // payment(){
  //   return this.http.get('http://127.0.0.1:8000/api/payment/');
  // }

  cancelldorder(id:any){
    return this.http.get('http://127.0.0.1:8000/api/cancelldorder/'+id);
  }
  getCopoun(data: any){
    return this.http.post('http://127.0.0.1:8000/api/getCopoun',data);
  }

  filterbystatus(data: any){
    return this.http.post('http://127.0.0.1:8000/api/filterbystatus',data); 
  }



}
