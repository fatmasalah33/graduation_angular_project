import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../cart';
import { Product } from '../product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { RegisterService } from '../services/register.service';
import { WishlistService } from '../services/wishlist.service';
import { Wishlsit } from '../wishlist';



@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  id:any;
  data:any;
  product:any;
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
  selectedValue: any;
  cat_id:any
  related: Array<any> = [];
  constructor(private productsService :ProductsService,
    private _CartService:CartService,private _WishlistService:WishlistService,private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,private router: Router,private registerService :RegisterService) { }
    stars: number[] = [1, 2, 3, 4, 5];
    countStar(star:any) {
      this.selectedValue = star;
      console.log('Value of star', star);
      console.log(this.selectedValue)
    
  }
  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getDatabyid();
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
      // this.relatedProduct()
  }
  getDatabyid(){
    this.productsService.getData(this.id).subscribe(res=>{
      this.data=res;
      this.product=this.data.data
       this.cat_id=this.data.data.category_id
       this.productsService.relatedProduct(this.data.data.category_id).subscribe((data : any)=>{
        this.related=data
        console.log(data)
        console.log(this.related)
       })
      console.log(this.product)
      console.log(this.cat_id)
    })
  }
  // relatedProduct(){
  //   console.log('hi')
  //   console.log(this.cat_id)
    //  this.productsService.relatedProduct(2).subscribe((data : any)=>{
    //   console.log(data)
    //   console.log('hi')
    //  })
  // }
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
    this.count++
    this._CartService.setCartCount(this.count)
    console.log( event.target.parentNode.lastChild)
    // event.target.style.display='none'
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
      console.log(this.cart[i].quantity)
     
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
   
    this.toastr.info('The product is exit in Wishlist');
    this.ietmExists = true
 
    break;
  }else{
    this.ietmExists = false
  }
}
if (!this.ietmExists) {
  this._WishlistService.insertdate(this.saveditem).subscribe(data => {
    this.toastr.success('The product has been successfully added to the Wishlist');
    this.getallsaveitem()
    console.log('ok')
    });
 
  console.log('hi')
 

}
}
gettotalitem(){
  this._CartService.gettotalitem(this.userid).subscribe((data: any)=>{
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

}
