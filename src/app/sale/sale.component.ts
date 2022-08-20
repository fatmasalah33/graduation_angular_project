import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../cart';
import { Filter } from '../filter';
import { CartService } from '../services/cart.service';
import { CatogeryService } from '../services/catogery.service';
import { OffersService } from '../services/offers.service';
import { ProductsService } from '../services/products.service';
import { RegisterService } from '../services/register.service';
import { WishlistService } from '../services/wishlist.service';
import { Wishlsit } from '../wishlist';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {


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
  categories : Array<any> = [];
 subcat: Array<any> = [];
  brands : Array<any> = [];
  id: any;
selected_cat: Array<any> = [];
filter=new Filter();
  constructor(private productsService :ProductsService,private registerService :RegisterService
    ,private _CartService:CartService,
    private activatedRoute: ActivatedRoute,
    private _WishlistService:WishlistService,private _CatogeryService:CatogeryService,
    private _OffersService:OffersService,private toastr: ToastrService ) { 
 
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
  
     console.log(this.activatedRoute.snapshot.params['id']);
     this.id=this.activatedRoute.snapshot.params['id'];
    this.getallcarts()
    console.log(this.cart)
    this.getallsaveitem()
    this.gettotalitem()
      this.gettotal()
      this.getallcategories()
      this.getOffersproduct()
  }
  productOffered: Array<any> = [];
  getOffersproduct(){
    this._OffersService.productOffered().subscribe((data : any)=>{
      console.log(data)
      this.productOffered=data
    })
  }
  applyfilter(){
    this._CatogeryService.Filterbybrand(this.filter).subscribe((data : any)=>{
      console.log(data)
      this.products=data.products
      console.log(this.filter)
    })
  }
  //  document.querySelectorAll('')
  // numInputs.forEach(function(input) {
  //   input.addEventListener('change', function(e) {
  //     if (e.target.value == '') {
  //       e.target.value = 0
  //     }
  //   })
  // })
  index:any;
  addbrand(event:any){
    console.log(event.target.checked)
    if(event.target.checked){
      this.selected_cat.push(event.target.id)
      
    }else{
     this.index =this.selected_cat.indexOf(event.target.id)
     this.selected_cat.splice(this.index,1)
    }
    console.log(this.selected_cat)
    this.filter.selected_brands=this.selected_cat
    console.log(this.filter)
this._CatogeryService.Filterbybrand(this.filter).subscribe((data : any)=>{
  console.log(data)
  this.products=data.products
})
  }
  minprice(e: any){
    console.log(e.target.value)
    if (e.target.value == '') {
            e.target.value = 1
          }
    this.filter.price.min=parseInt(e.target.value)
  }
  maxprice(e: any){
    console.log(e.target.value)
    if (e.target.value == '') {
      e.target.value = 3000
    }
    this.filter.price.max=parseInt(e.target.value)
  }
  getallcategories(){
   
    this._CatogeryService.getsubCategory(this.id).subscribe((data : any) => {
      this.categories =data.subcat.categories ;
      this.products =data.products ;
      this.brands=data.brand
      this.categories.forEach(element => {
        this.subcat.push(element.id)
      });
      console.log(data)
      console.log(this.subcat)
       console.log(this.brands[0])
      });
      this.filter.id=this.subcat
  }
  getallproducts(){
    // this.productsService.getProductsList().subscribe((data : any) => {
    //   this.products =data.data.products ;
    //   console.log(data.data.products)
    //   console.log(this.products)
    //   console.log(this.cart)
    //   });
      
  }
  filterbycat(id:any){
    console.log(this.subcat)
    this.subcat=[]
this.subcat.push(id);
    this.filter.id=this.subcat
    console.log(this.filter)
    this._CatogeryService.filterbycat(id).subscribe((data : any)=>{
      this.products =data.data.products ;
      this.brands=data.brand
      console.log(this.brands)
      console.log(data)
    })

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


}
