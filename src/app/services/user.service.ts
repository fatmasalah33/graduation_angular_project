import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getUserList() {
    return this.http.get(' http://127.0.0.1:8000/api/users');
  }
  alluser(){
    return this.http.get(' http://127.0.0.1:8000/api/alluser');
  }
}
