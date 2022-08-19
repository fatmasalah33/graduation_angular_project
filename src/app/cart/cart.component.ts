import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../cart';
import { CartService } from '../services/cart.service';
import { RegisterService } from '../services/register.service';
import { WishlistService } from '../services/wishlist.service';
import { Wishlsit } from '../wishlist';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pathimage:any="http://127.0.0.1:8000/public/image/";
cart :Array<any> = [];
products : Array<any> = [];
logeduser:any
userid:any;
totalprice:number=0
  item: any;
  savearray: Array<any> = [];
  l:number=0
  cat=new Cart();
  saveditem=new Wishlsit();
  constructor(private _CartService:CartService,
    private registerService :RegisterService,private _WishlistService:WishlistService
    ,private router: Router) { }

  ngOnInit(): void {
    this.registerService.currentUsers.subscribe((data:any)=>{
      console.log(data)

      if(data  )
      {
        this.logeduser= this.registerService.getloginuser()
        console.log(this.logeduser)
        this.userid=this.logeduser.id;
      
     
        
      }
   

     })
    console.log(this.cart)
    this.getallsaveitem()
    this.getallcarts()
    this.gettotal()
    this.gettotalitem()
  }
  getallsaveitem(){
    this._WishlistService.getData(this.userid).subscribe((data : any) => {
      this.savearray =data.data.wishlist;
      console.log(this.savearray)
      }); 
  }
  gettotal(){
    
    this._CartService.gettotalprice(this.userid).subscribe(data=>{
       this.totalprice=data[0].totalprice;
       console.log(data[0].totalprice)
    })
  }
  getallcarts(){
    this._CartService.getData(this.userid).subscribe((data : any) => {
      this.cart =data.data.cart ;
      this.l= this.cart.length
      console.log(this.cart)
 
      });
  }
  updateqty = new Cart();
  decreaseQuantity(cat: any,i:number){
    console.log(i);
    if(this.cart[i].quantity>1){
      this.cart[i].quantity--;
    }
    this.count--
    this._CartService.setCartCount(this.count)
    this.updateqty.quantity= cat.quantity
     
     this._CartService. updatecart(cat.id, this.updateqty).subscribe((res: any)=>{
   
       console.log(res);
       this.getallcarts()
       this.gettotal()
     })
  }
  count:number=0
  gettotalitem(){
    this._CartService.gettotalitem(this.userid).subscribe((data: any)=>{
    this.count=data[0].count;
    this._CartService.setCartCount(this.count)
    console.log(this.count)
    })
  }
 
  increaseQuantity(cat: any,i:number){
    console.log(i);
    this.cart[i].quantity++;

    this.updateqty.quantity= cat.quantity
    console.log(this.updateqty)
    this.count++
    this._CartService.setCartCount(this.count)
     this._CartService.updatecart(cat.id, this.updateqty).subscribe((res: any)=>{
   
       console.log(res);
     
       this.getallcarts()
       this.gettotal()
     })

  }
  deletecartitem(id: any){
    this._CartService.deletecart(id).subscribe(data => {
      this.getallcarts()
      this.gettotal()
      this.gettotalitem()
      });

  }

  productExists = false
  ietmExists = false
 
 
  insertincart(event: any,item:any){
    this.count++
    this._CartService.setCartCount(this.count)
    console.log( event.target.parentNode.lastChild)
    // event.target.style.display='none'
    console.log(this.cart)
    this.cat.product_id=item.id
    this.cat.user_id=this.userid
    console.log(this.cat.user_id)
    console.log(item.Offeres)
    if(item.Offeres==null){
      this.cat.price=item.price
      console.log('v')
    }else{
      this.cat.price=item.Offeres.price_offer
      console.log('b')
    }
   
    console.log(this.cat.price)
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
  }
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
outofstok:boolean =false;
checkout(){
  for (let i=0;i< this.cart.length;i++) {
    if(this.cart[i].product[0].quantity==0){
      alert('the cart is contain product out of stock . please remove it first and checkout again')
      this.outofstok=true
      break;
    }
  else{
    this.outofstok=false
        console.log('bubu')
      }
    }
    if(!this.outofstok){
      this.router.navigate(['/cart','checkout']); 
    }
  }
  // this.cart.forEach(element => {
  //   if(element.product[0].quantity==0){
  
  //   }else{
  //     this.router.navigate(['/cart','checkout']);
  //   }
  // });

}
