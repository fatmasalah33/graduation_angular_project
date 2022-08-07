import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean =false;
  isAdmin:boolean =false;
  logeduser:any
  userid:any;
  totalprice:number=0
  keyword:any
  constructor(private _RegisterService:RegisterService,private _CartService:CartService,private router: Router ) { 
  
   
    
  }
 count:number=0
  username=''
  logOut()
  {
    this._RegisterService.logOut();
    
  }
  currentUrl = this.router.url;
  ngOnInit(): void {
    this._RegisterService.currentUsers.subscribe((data:any)=>{
      console.log(data)

      if(data  )
      {
        this.logeduser= this._RegisterService.getloginuser()
        console.log(this.logeduser)
          this.username=this.logeduser.name;
          this.userid=this.logeduser.id;
         console.log(this.username)
        if(this.logeduser.user_type=='buyer'){
          this.isLogin = true;
        }
        if(this.logeduser.user_type=='admin'){
          this.isAdmin = true;
        }
        this.router.navigate([this.currentUrl]);
        console.log(this.currentUrl); 
     
        
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
  getcatsearch(e:any){
    this.keyword=e.target.value
    console.log(this.keyword)

  }
}
