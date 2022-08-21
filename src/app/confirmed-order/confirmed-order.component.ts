import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-confirmed-order',
  templateUrl: './confirmed-order.component.html',
  styleUrls: ['./confirmed-order.component.css']
})
export class ConfirmedOrderComponent implements OnInit {
  logeduser:any
  userid:any;
  totalprice:number=0
  count:number=0
  constructor(  private registerService :RegisterService
    ,private _CartService:CartService) { }

  ngOnInit(): void {
    this.registerService.currentUsers.subscribe((data)=>{
      console.log(data)

      if(data != null )
      {
        this.logeduser= this.registerService.getloginuser()
        console.log(this.logeduser)
        this.userid=this.logeduser.id;
        }
      
     
        
  
   

     })
     this.gettotalitem()
  }
  gettotalitem(){
    this._CartService.gettotalitem(this.userid).subscribe((data: any)=>{
    this.count=data[0].count;
    this._CartService.setCartCount(data[0].count)
    console.log(this.count)
    })
  }
}
