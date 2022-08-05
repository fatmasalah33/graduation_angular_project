import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  
  constructor(private http: HttpClient) { }
  getwishlist() {
    return this.http.get('http://127.0.0.1:8000/api/wishlist');
  }
  deletewishlist(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/wishlist/'+id);
  }
  insertdate(data: any){
    return this.http.post('http://127.0.0.1:8000/api/wishlist',data);
  }
  getData(id:any){
    return this.http.get('http://127.0.0.1:8000/api/wishlist/'+id);
  }
 
}
