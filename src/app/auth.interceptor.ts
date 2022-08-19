import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
token:any=''
x:any
localarry: Array<any> = [];
  constructor() {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('userData') != null){
      this.x=localStorage.getItem('userData')
       this.token=JSON.parse(this.x).token
    
      
    }
    const accessToken = this.token;
    request =request.clone({
        setHeaders: {
            Authorization: "Bearer " + accessToken
        }
    });
 
    return next.handle(request);
  }
}
