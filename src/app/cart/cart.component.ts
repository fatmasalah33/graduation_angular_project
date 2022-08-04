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
  constructor(private _CartService:CartService,private registerService :RegisterService) { }

  ngOnInit(): void {
   
    console.log(this.cart)
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.userid=this.logeduser.id;
    this.getallcarts()
  }
  getallcarts(){
    this._CartService.getData(this.userid).subscribe((data : any) => {
      this.cart =data.data.cart ;
      console.log(this.cart)
      });
  }
  updateqty = new Cart();
  decreaseQuantity(cat: any){
    if(cat.quantity>1){
      cat.quantity--;
    }
    

    this.updateqty.quantity= cat.quantity
     
     this._CartService. updatecart(cat.id, this.updateqty).subscribe((res: any)=>{
   
       console.log(res);
       this.getallcarts()
     })
  }
  increaseQuantity(cat: any){
 
      cat.quantity++;
    
    

    this.updateqty.quantity= cat.quantity
     
     this._CartService. updatecart(cat.id, this.updateqty).subscribe((res: any)=>{
   
       console.log(res);
       this.getallcarts()
     })

  }

}
