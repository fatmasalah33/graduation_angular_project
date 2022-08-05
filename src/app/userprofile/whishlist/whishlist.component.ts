import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
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
  constructor(private registerService :RegisterService
    ,private _CartService:CartService,private _WishlistService:WishlistService) { }

  ngOnInit(): void {
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.userid=this.logeduser.id;
  
    this.getallsaveitem()
  }
  getallsaveitem(){
    this._WishlistService.getData(this.userid).subscribe((data : any) => {
      this.savearray =data.data.wishlist;
      
      }); 
  }
}
