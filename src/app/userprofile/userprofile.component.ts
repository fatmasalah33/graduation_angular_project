import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
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
  random: Array<any> = [];
  pathimage:any="http://127.0.0.1:8000/public/image/";
  constructor(private _RegisterService:RegisterService ,private productsService :ProductsService) { 
    
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
    this.randomProduc()
  }
  randomProduc(){
    this.productsService.randomProduc().subscribe((data : any)=>{
      console.log(data)
      this.random=data
    })
      } 

}
