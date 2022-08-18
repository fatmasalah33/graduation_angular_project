import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { userData } from '../userData';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  user:any
  x:any
  username:string = ''
  logeduser:any
  localarry: Array<any> = [];
  currentUsers =  new BehaviorSubject(null);
  currentType =  new BehaviorSubject('');
  y:any
  storagerole:any;
  constructor(private http: HttpClient , private _Router:Router ) { 
    if(localStorage.getItem('userData')){
      this.x=localStorage.getItem('userData')
      this.y=JSON.parse(this.x)
    this.loginuser(JSON.parse(this.x))
    // this.localarry=JSON.parse(this.x)
    // console.log(JSON.parse(this.x).token)
      this.currentUsers.next(  JSON.parse(this.x)  )
  
    }
    if(localStorage.getItem('userRole')){
      this.storagerole=localStorage.getItem('userRole')
      this.currentType.next(JSON.parse(this.storagerole))
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
  saveCurrentUser(id:number,name: string  , email: string , token: string,address:string,phone:string,type:string)
  {
    this.user = new userData(id,name , email , token,address,phone,type);

    localStorage.setItem('userData' ,JSON.stringify(this.user) );
    localStorage.setItem('userRole' ,JSON.stringify(type) );
    this.loginuser(this.user)
    this.currentUsers.next(this.user);
    this.currentType.next(type)
   
  }
 
  logOut()
  {
      this.currentType.next('')
      this.currentUsers.next(null);
      localStorage.removeItem('userData');
      localStorage.removeItem('userRole');
      this.loginuser(this.y )

      this._Router.navigate(['/signin']);

  }
  loginuser(user: any){
   this.logeduser=user
   
   
  }
  
  loginuserrole(){
    this.logeduser= this.getloginuser()
    return this.logeduser.user_type
    
    
   }
  getloginuser():Observable<any>{
    return this.logeduser
  }
 
  code(verifyFormValue:any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/verifyAccount',verifyFormValue);
  }
  changepassword(id: any,data:any){
    return this.http.post('http://127.0.0.1:8000/api/changepassword/'+id,data); 
  }
  forgetpassword(data: any){
    return this.http.post('http://127.0.0.1:8000/api/forgetpassword',data); 
  }
  updatepassword(id:any,data: any){
    return this.http.post('http://127.0.0.1:8000/api/updatepassword/'+id,data); 
  }
}

