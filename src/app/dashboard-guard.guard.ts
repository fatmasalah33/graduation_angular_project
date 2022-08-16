import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './services/register.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardGuard implements CanActivate {
 
  constructor(private _RegisterService:RegisterService  , private _Router:Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._RegisterService.currentUsers.getValue() != null && this._RegisterService.loginuserrole()=="admin")
      {
       
    
        return true;
      }
     else
     {
       this._Router.navigate(['/signin']);
       return false;
     }
  }
  
}
