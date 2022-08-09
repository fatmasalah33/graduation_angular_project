import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviweService {

  constructor(private http: HttpClient) { }
 
  getReviweList() {
    return this.http.get(' http://127.0.0.1:8000/api/reviews');
  }
  deleteReviwe(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/reviews/'+id);
  }
  insertReviwe(data: any){
    return this.http.post('http://127.0.0.1:8000/api/reviews',data);
  }
  getData(id:any){
    return this.http.get('http://127.0.0.1:8000/api/reviews/'+id);
  }
  updateReviwe(id: any,data:any){
    return this.http.put('http://127.0.0.1:8000/api/reviews/'+id,data);
  }
  getproducttoreview(id:any){
    return this.http.get('http://127.0.0.1:8000/api/review/'+id);
  }
}
