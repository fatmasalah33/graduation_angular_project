import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-mainnavbar',
  templateUrl: './mainnavbar.component.html',
  styleUrls: ['./mainnavbar.component.css']
})
export class MainnavbarComponent implements OnInit {
  isLogin:boolean =false;
  isAdmin:boolean =false;
  isSeller:boolean =false;
 
  logeduser:any
  userid:any;
  isnotnull:boolean =false;
  totalprice:number=0
  keyword:any
  products:Array<any> = [];
  constructor(private _RegisterService:RegisterService,
    private _ProductsService:ProductsService, private _CartService:CartService,private router: Router ) { 
  
   
    
  }
 count:number=0
  username=''
  logOut()
  {
    this._RegisterService.logOut();
    this._CartService.cartCount.next(0);
    localStorage.removeItem('cart_count');
  }
  currentUrl = this.router.url;
  ngOnInit(): void {
    this._RegisterService.currentUsers.subscribe((data:any)=>{
      console.log(this._RegisterService.currentType.getValue())
console.log(this._RegisterService.getloginuser())
      if(data  )
      {
        this.logeduser= this._RegisterService.getloginuser()
        console.log(this.logeduser)
          this.username=this.logeduser.name;
          this.userid=this.logeduser.id;
         console.log(this.username)
        if(this.logeduser.user_type=='buyer'){
          this.isLogin = true;
          this.isSeller = false;
          this.isAdmin = false;
          this.isnotnull=true
        }
        if(this.logeduser.user_type=='admin'){
          this.isAdmin = true;
          this.isSeller = false;
          this.isLogin = false;
          this.isnotnull=true
        }
        if(this.logeduser.user_type=='seller'){
          this.isSeller = true;
          this.isAdmin = false;
          this.isLogin = false;
          this.isnotnull=true
        }
        // this.router.navigate([this.currentUrl]);
        // console.log(this.currentUrl); 
     
        
      }
      else
      {
        this.isnotnull=false
        this.isAdmin = false;
        this.isLogin = false;
        this.isSeller = false;
        this.username='';
      }

     })
 this._CartService.cartCount.subscribe((data: any)=>
 {
  console.log(data)
 this.count=data
 }
 )
      this.gettotalitem()
      this.gettotal()
  }
  gettotalitem(){
    this._CartService.gettotalitem(this.userid).subscribe((data: any)=>{
    // this.count=data[0].count;
    this._CartService.setCartCount(data[0].count)
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
    console.log(e.target.value)
    // if(this.keyword.length==0){
    //   console.log(this.keyword.length)
    // }else{
    this._ProductsService.getDatasearch(this.keyword).subscribe((data: any)=>{
      console.log(data.data.products)
      this.products=data.data.products
      console.log(this.products)
    })
  
  }
  search(searchForm:any){
    console.log(searchForm.value)
    this._ProductsService.getId(searchForm.value).subscribe((data: any)=>{
      console.log(data)
      // [routerLink]="['/productdetails' , product.id]"
      this.router.navigate(['/productdetails' , data.id]);
    })
  }
}