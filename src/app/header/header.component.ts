import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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

  ngOnInit(): void {
   
  }

}
