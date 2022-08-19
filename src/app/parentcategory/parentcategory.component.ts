import { Component, OnInit } from '@angular/core';
import { EventType } from '@angular/router';
import { Cart } from '../cart';
import {Wishlsit} from '../wishlist';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { RegisterService } from '../services/register.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-parentcategory',
  templateUrl: './parentcategory.component.html',
  styleUrls: ['./parentcategory.component.css']
})
export class ParentcategoryComponent implements OnInit {
  pathimage:any="http://127.0.0.1:8000/public/image/";
  cart :Array<any> = [];
  products : Array<any> = [];
  savearray: Array<any> = [];
  cat=new Cart();
  logeduser:any
  userid:any;
  totalprice:number=0
  count:number=0
saveditem=new Wishlsit();
  isexist:boolean=false;
  
 
  constructor(private productsService :ProductsService,private registerService :RegisterService
    ,private _CartService:CartService,private _WishlistService:WishlistService) { 
 
  }

  ngOnInit(): void {
    this.getallproducts()
    this.registerService.currentUsers.subscribe((data)=>{
      console.log(data)

      if(data != null )
      {
        this.logeduser= this.registerService.getloginuser()
        console.log(this.logeduser)
        this.userid=this.logeduser.id;
        }
      
     
        
  
   

     })
  
 
    this.getallcarts()
    console.log(this.cart)
    this.getallsaveitem()
    this.gettotalitem()
      this.gettotal()

  }
  getallproducts(){
    this.productsService.getProductsList().subscribe((data : any) => {
      this.products =data.data.products ;
      console.log(data.data.products)
      console.log(this.products)
      console.log(this.cart)
      });
      
  }
  getallcarts(){
    this._CartService.getData(this.userid).subscribe((data : any) => {
      this.cart =data.data.cart ;
      console.log(data.data.cart)
      console.log(this.cart)
      });
  }
  getallsaveitem(){
    this._WishlistService.getData(this.userid).subscribe((data : any) => {
      this.savearray =data.data.wishlist;
      
      }); 
  }

  productExists = false
  ietmExists = false
  updateqty = new Cart();
 
  insertincart(event: any,item:any){
    if(this.userid==null){
      alert('you must login first')
    }else{
    console.log( event.target.parentNode.lastChild)
    // event.target.style.display='none'
    console.log(this.cart)
    this.cat.product_id=item.id
    this.cat.user_id=this.userid
    console.log(this.cat.user_id)
    this.cat.price=item.price*this.cat.quantity
    for (let i=0;i< this.cart.length;i++) {
    if(this.cart[i].product[0].id==item.id){
      console.log(this.cart[i].quantity)
     
this.cart[i].quantity++;

     this.updateqty.quantity= this.cart[i].quantity
     
        // this.router.navigate(['/dashboard/', 'allcatogery']);
      
      this.productExists = true
      this._CartService. updatecart(this.cart[i].id, this.updateqty).subscribe((res: any)=>{
        this.gettotalitem()
        this.gettotal()
        console.log(res);
      })
      break;
    }else{
      this.productExists = false
    }
  }
  if (!this.productExists) {
   this._CartService.insertdate(this.cat).subscribe(data => {
  this.getallcarts()
  this.gettotalitem()
      this.gettotal()
  });
  }}
 }
 addtowhishlist(ietm:any,e:any){
// e.target.style.backgroundColor='red'
  this.saveditem.user_id=this.userid
  this.saveditem.product_id=ietm.id
console.log(this.saveditem)
console.log(this.savearray)
for (let i=0;i< this.savearray.length;i++) {
  if(this.savearray[i].product_id==ietm.id){
   
   
    this.ietmExists = true
 
    break;
  }else{
    this.ietmExists = false
  }
}
if (!this.ietmExists) {
  this._WishlistService.insertdate(this.saveditem).subscribe(data => {
    this.getallsaveitem()
    console.log('ok')
    });
 
  console.log('hi')
 

}
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
