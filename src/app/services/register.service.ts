import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { userData } from '../userData';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  user:any
  x:any
  username:string = ''
  logeduser:any
  currentUsers =  new BehaviorSubject(null);
  constructor(private http: HttpClient) { 
    if(localStorage.getItem('userData') != null){
      this.x=localStorage.getItem('userData')
    this.loginuser(JSON.parse(this.x))
    console.log(this.logeduser)
      this.currentUsers.next(  JSON.parse(this.x)  )
    }
  }
  insertdate(data: any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/register',data);
  }
  login(loginFormValue:any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/login',loginFormValue);
  }
  updateuser(id: any,data:any){
    return this.http.put('http://127.0.0.1:8000/api/users/'+id,data);
  }
  saveCurrentUser(id:number,name: string  , email: string , token: string,address:string,phone:string)
  {
    this.user = new userData(id,name , email , token,address,phone);

    localStorage.setItem('userData' ,JSON.stringify(this.user) );
    this.currentUsers.next(this.user);
   
  }
  y:any=null;
  logOut()
  {
      this.currentUsers.next(null);
      localStorage.setItem('userData' , this.y );

      // this._Router.navigate(['/login']);

  }
  loginuser(user: any){
   this.logeduser=user
   
  }
  getloginuser(){
    return this.logeduser
  }
}

