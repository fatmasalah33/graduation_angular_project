import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean =false;
  logeduser:any
  userid:any;
  totalprice:number=0
  constructor(private _RegisterService:RegisterService,private _CartService:CartService ) { 
  
   
    
  }
 count:number=0
  username=''
  logOut()
  {
    this._RegisterService.logOut();
    
  }
  ngOnInit(): void {
    this._RegisterService.currentUsers.subscribe((data)=>{

      if(data != null)
      {
        this.isLogin = true;
        this.logeduser= this._RegisterService.getloginuser()
        console.log(this.logeduser)
          this.username=this.logeduser.name;
          this.userid=this.logeduser.id;
         console.log(this.username)
      }
      else
      {
        this.isLogin = false;
        this.username='';
      }

     })
 
      this.gettotalitem()
      this.gettotal()
  }
  gettotalitem(){
    this._CartService.gettotalitem(this.userid).subscribe((data: any)=>{
    this.count=data[0].count;
    console.log(this.count)
    })
  }
  gettotal(){
    this._CartService.gettotalprice(this.userid).subscribe(data=>{
       this.totalprice=data[0].totalprice;
       console.log(data[0].totalprice)
    })
  }
}
