import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../services/cart.service';
import { RegisterService } from '../services/register.service';

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

  l:number=0
  constructor(private _CartService:CartService,private registerService :RegisterService) { }

  ngOnInit(): void {
   
    console.log(this.cart)
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.userid=this.logeduser.id;
    this.getallcarts()
    this.gettotal()
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
    
    this.updateqty.quantity= cat.quantity
     
     this._CartService. updatecart(cat.id, this.updateqty).subscribe((res: any)=>{
   
       console.log(res);
       this.getallcarts()
       this.gettotal()
     })
  }
  increaseQuantity(cat: any,i:number){
    console.log(i);
    this.cart[i].quantity++;

    this.updateqty.quantity= cat.quantity
     
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
      });

  }

}
