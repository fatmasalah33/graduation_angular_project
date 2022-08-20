import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { RegisterService } from 'src/app/services/register.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  pathimage:any="http://127.0.0.1:8000/public/image/";
  savearray: Array<any> = [];
  logeduser:any
  userid:any;
  id:any;
  data:any;
  product:any;
 
  cart :Array<any> = [];
  products : Array<any> = [];
 
  cat=new Cart();
 
  totalprice:number=0
  count:number=0

  isexist:boolean=false;
  constructor(private registerService :RegisterService
    ,private _CartService:CartService,private _WishlistService:WishlistService
    ,private productsService :ProductsService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.userid=this.logeduser.id;
  
    this.getallsaveitem()
    this.getallcarts()
    this.gettotalitem()
      this.gettotal()
  }
  productExists = false
  ietmExists = false
  updateqty = new Cart();
 
  insertincart(event: any,item:any){
    console.log( event.target.parentNode.lastChild)
    // event.target.style.display='none'
    this.count++
    this._CartService.setCartCount(this.count)
    console.log(this.cart)
    this.cat.product_id=item.id
    this.cat.user_id=this.userid
    console.log(this.cat.user_id)
    if(item.Offeres==null){
      this.cat.price=item.price
      console.log('v')
    }else{
      this.cat.price=item.Offeres.price_offer
      console.log('b')
    }
    for (let i=0;i< this.cart.length;i++) {
    if(this.cart[i].product[0].id==item.id){
      console.log('the item is exists')
     
this.cart[i].quantity++;

     this.updateqty.quantity= this.cart[i].quantity
     
        // this.router.navigate(['/dashboard/', 'allcatogery']);
      
      this.productExists = true
      this._CartService. updatecart(this.cart[i].id, this.updateqty).subscribe((res: any)=>{
        this.toastr.info('The product is exit in cart  and quantity now is '+this.updateqty.quantity);
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
    this.toastr.success('The product has been successfully added to the card');
  this.getallcarts()
  this.gettotalitem()
      this.gettotal()
  });
  }
 }
  getallcarts(){
    this._CartService.getData(this.userid).subscribe((data : any) => {
      this.cart =data.data.cart ;
      console.log(data.data.cart)
      console.log(this.cart)
      });
  }
  gettotalitem(){
    this._CartService.gettotalitem(this.userid).subscribe((data: any)=>{
    this.count=data[0].count;
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
  getallsaveitem(){
    this._WishlistService.getData(this.userid).subscribe((data : any) => {
      this.savearray =data.data.wishlist;
      console.log(data)
      
      }); 
  }
  deleteitem(id:any){
    this._WishlistService.deletewishlist(id).subscribe((data : any)=>{
      console.log(data)
      this.getallsaveitem()
    })

  }
}
