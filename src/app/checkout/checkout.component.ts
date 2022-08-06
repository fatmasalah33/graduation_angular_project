import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { CartService } from '../services/cart.service';
import { Order } from '../order';
import { Cart } from '../cart';
import { RegisterService } from '../services/register.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
   form:FormGroup
   user_id:any
  logeduser: any
  price : any;
  Order=new Order()
  constructor(public fb:FormBuilder, private OrdersService :OrdersService,private router: Router,private _CartService:CartService,private registerService :RegisterService) {
    this.form = this.fb.group({
      yourname:null,
     phone:null,
     copoun:null,
      price:this.price,
      comment:null,
      address_state:null,
      address_city :null,
      address_street :null,
     user_id :this.user_id,
      payment_id:null,


    })

  }

  ngOnInit(): void {
    this.registerService.currentUsers.subscribe((data:any)=>{
      console.log(data)

      if(data)
      {
        this.logeduser= this.registerService.getloginuser()
        console.log(this.logeduser)
        this.user_id=this.logeduser.id;



      }



     })
     this.gettotal()
  }
  gettotal(){
    this._CartService.gettotalprice(this.user_id).subscribe(data=>{
     this.price=data[0].totalprice;
      //  return data[0].totalprice
    })
  }
  insertdate(){
    // let data = new FormData;
    const formData :any = new FormData;


    // formData.append("status" , this.form.controls['status'].value);
    formData.append("price" , this.price);
    formData.append("comment" , this.form.controls['comment'].value);
    formData.append("address_state" , this.form.controls['address_state'].value);
    formData.append("address_city" , this.form.controls['address_city'].value);
    formData.append("address_street" , this.form.controls['address_street'].value);
    formData.append("user_id" , this.user_id);
    formData.append("payment_id" , this.form.controls['payment_id'].value);
    formData.append("copoun" , this.form.controls['copoun'].value);

    this.OrdersService.insertdate(formData).subscribe(data => {
      // this.router.navigate(['/dashboard/', 'allorders']);
      console.log(data)
      });
     console.log(this.form.value);

    }
}
