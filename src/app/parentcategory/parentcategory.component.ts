import { Component, OnInit } from '@angular/core';
import { EventType } from '@angular/router';
import { Cart } from '../cart';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-parentcategory',
  templateUrl: './parentcategory.component.html',
  styleUrls: ['./parentcategory.component.css']
})
export class ParentcategoryComponent implements OnInit {
  pathimage:any="http://127.0.0.1:8000/public/image/";
  cart :Array<any> = [];
  products : Array<any> = [];
  cat=new Cart();
  logeduser:any
  userid:any;
 

  isexist:boolean=false;
  
 
  constructor(private productsService :ProductsService,private registerService :RegisterService
    ,private _CartService:CartService) { 
 
  }

  ngOnInit(): void {
    this.getallproducts()
   
  
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.userid=this.logeduser.id;
    this.getallcarts()
    console.log(this.cart)

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

  productExists = false
  updateqty = new Cart();
 
  insertincart(event: any,item:any){
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
  });
  }
 }
 addtowhishlist(ietm:any){

 }

}
