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
  handler:any = null;
  token:any;
  states : Array<any> = [];
  cities:Array<any> = [];
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
        console.log(this.user_id)
      }

     })
     this.gettotal();
     this.loadStripe();
     this.getallstates()
    //  console.log(this.token);
  }
  getallstates(){
    this.OrdersService.getstates().subscribe((data : any)=>{
      this.states=data
    })
  }

  getid(e: any){
    console.log(e.target.value)
    this.OrdersService.getcities(e.target.value).subscribe((data : any)=>{
      this.cities=data
      console.log(this.cities)
    })
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
  //  console.log(this.token.id)
  console.log(this.user_id)
    // formData.append("status" , this.form.controls['status'].value);
    formData.append("price" , this.price);
    formData.append("comment" , this.form.controls['comment'].value);
    formData.append("address_state" , this.form.controls['address_state'].value);
    formData.append("address_city" , this.form.controls['address_city'].value);
    formData.append("address_street" , this.form.controls['address_street'].value);
    formData.append("user_id" , this.user_id);
    formData.append("payment_id" , this.form.controls['payment_id'].value);
    formData.append("copoun" , this.form.controls['copoun'].value);
    console.log(formData)
     if (((this.form.controls['payment_id'].value==1))|| ((this.form.controls['payment_id'].value==2) && (localStorage.getItem('token_id')))  ){

    this.OrdersService.insertdate(formData).subscribe(data => {
      // this.router.navigate(['/dashboard/', 'allorders']);
      console.log(data)
      });}
      else {
        alert("please check payment method credit or cash ");
        // console.log( this.token.id)
      }
     console.log(this.form.value);

    }




    // ostor ya rab


    pay(amount: any) {

      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
        locale: 'auto',
        token: function (token: any) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log(token)
          localStorage.setItem('token_id' ,JSON.stringify(token.id) );
          // this.token=token.id
          // console.log( this.token_id)
          alert('Token Created!!');
        }
      });

      handler.open({
        name: 'welcome to pay',
        description: 'please enter your data',
        amount: amount
      });

    }

    loadStripe() {

      if(!window.document.getElementById('stripe-script')) {
        var s = window.document.createElement("script");
        s.id = "stripe-script";
        s.type = "text/javascript";
        s.src = "https://checkout.stripe.com/checkout.js";
        s.onload = () => {
          this.handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
            locale: 'auto',
            token: function (token: any) {
              // You can access the token ID with `token.id`.
              // Getr server-side cod the token ID to youe for use.
              console.log(token.id)
              localStorage.setItem('token_id' ,JSON.stringify(token.id) );
              // this.token_id=token.id
              alert('Payment Success!!');
            }
          });
        }

        window.document.body.appendChild(s);
      }
    }
}
