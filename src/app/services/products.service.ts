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
  getDatasearch(keyword:any){
    return this.http.get('http://127.0.0.1:8000/api/product/search/'+keyword);
  }
  
   getProductsListuser(id:any) {
    return this.http.get('http://127.0.0.1:8000/api/producterbyuser/'+id);
  }
  notVerifiedProducts(){
    return this.http.get('http://127.0.0.1:8000/api/notVerifiedProducts');
  }
  verifyProduct(id: any){
    return this.http.get('http://127.0.0.1:8000/api/verifyProduct/'+id);
  }
  notVerifiedProduct_seller(id: any){
    return this.http.get('http://127.0.0.1:8000/api/notVerifiedProduct_seller/'+id);
  }
  VerifiedProduct_seller(id: any){
    return this.http.get('http://127.0.0.1:8000/api/VerifiedProduct_seller/'+id);
  }
  bestSeller(){
    return this.http.get('http://127.0.0.1:8000/api/bestSeller');
  }
  
  getMoney(id: any){
    return this.http.get('http://127.0.0.1:8000/api/getMoney/'+id);
  }
  relatedProduct(id:any){
    return this.http.get('http://127.0.0.1:8000/api/relatedProduct/'+id);
  }
  randomProduc(){
    return this.http.get('http://127.0.0.1:8000/api/randomProduct');
  }
  getId(data: any){
    return this.http.post('http://127.0.0.1:8000/api/getId',data);
  }
}
