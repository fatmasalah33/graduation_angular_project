import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }
  getoffersList() {
    return this.http.get('http://127.0.0.1:8000/api/offeres');
  }
  deleteoffer(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/offeres/'+id);
  }
  insertdate(data: any){
    return this.http.post('http://127.0.0.1:8000/api/offeres',data);
  }
  getData(id:any){
    return this.http.get('http://127.0.0.1:8000/api/offeres/'+id);
  }
  updateoffer(id: any,data:any){
    return this.http.put('http://127.0.0.1:8000/api/offeres/'+id,data);
  }
  productOffered(){
    return this.http.get('http://127.0.0.1:8000/api/productOffered');
  }
  getAllOffers(id:any){
    return this.http.get('http://127.0.0.1:8000/api/getAllOffers/'+id);
  }
  expiredoffers(id:any){
    return this.http.get('http://127.0.0.1:8000/api/endedoffer/'+id);
  }
  continuesoffer(id:any){
    return this.http.get('http://127.0.0.1:8000/api/workoffer/'+id);
  }
}
