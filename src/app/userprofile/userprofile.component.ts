import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  isLogin:boolean =false;
  logeduser:any
  username:string = ''
  constructor(private _RegisterService:RegisterService ) { 
    
    _RegisterService.currentUsers.subscribe((data)=>{

      if(data != null)
      {
        this.isLogin = true;
        // this.username= _RegisterService.username
      }
      else
      {
        this.isLogin = false;
      }

     })
     this.logeduser= this._RegisterService.getloginuser()
     console.log(this.logeduser)
     this.username=this.logeduser.name;
      console.log(this.username)
  }
  logOut()
  {
    this._RegisterService.logOut();
    
  }
  ngOnInit(): void {
  }
  

}
