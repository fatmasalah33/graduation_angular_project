import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getProductsList() {
    return this.http.get('http://127.0.0.1:8000/api/products');
  }
  deleteproduct(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/products/'+id);
  }
  insertdate(data: any){
    return this.http.post('http://127.0.0.1:8000/api/products',data);
  }
  getData(id:any){
    return this.http.get('http://127.0.0.1:8000/api/products/'+id);
  }
  updateproduct(id: any,data:any){
    return this.http.put('http://127.0.0.1:8000/api/products/'+id,data);
  }
}
