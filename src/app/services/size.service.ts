import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  
  
  constructor(private http: HttpClient) { }
  getsizeList(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/sizes')
  }
  deletesize(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/sizes/'+id);
  }
  insertdate(data: any){
  
    return this.http.post('http://127.0.0.1:8000/api/sizes',data);
  }
}
