import { Component, OnInit } from '@angular/core';
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
  products : Array<any> = [];
  cat=new Cart();
  logeduser:any
  userid:any;
  z:any=this._CartService.quantityarray;
  constructor(private productsService :ProductsService,private registerService :RegisterService,private _CartService:CartService) { }

  ngOnInit(): void {
    this.getallproducts()
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.userid=this.logeduser.id;

  }
  getallproducts(){
    this.productsService.getProductsList().subscribe((data : any) => {
      this.products =data.data.products ;
      console.log(data.data.products)
      });
  }
  insertincart(id: any,price:any){
    this.cat.product_id=id
    this.cat.user_id=this.userid
    this.cat.price=price*this.cat.quantity
    console.log(this.cat.price)
this._CartService.insertdate(this.cat,id).subscribe(data => {
  // this.router.navigate(['/dashboard/', 'allcatogery']);
  console.log('ok')
  });

  }
  decreaseQuantity(id: any,price: any){
    this._CartService.decreaseQuantity(id);
    console.log()
   
  }
  increaseQuantity(id: any,price: any){
    this._CartService.increaseQuantity(id);

  }
}
