import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { CartService } from '../services/cart.service';
import { Order } from '../order';
import { Cart } from '../cart';
import { RegisterService } from '../services/register.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {update} from '../update';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  handler:any = null;
  token:any;
  showSuccess: boolean = false;
  payment: any;
  price:any;
  id: any;
  status:any;
  constructor(public fb:FormBuilder, private OrdersService :OrdersService,private router: Router,private activatedRoute: ActivatedRoute) {


   }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getOrderDataByID();
    this.loadStripe();
    this.initConfig();

  }
  orderData:any;
  getOrderDataByID(){
    this.OrdersService.getData(this.id).subscribe(data => {
     this.orderData=data;
     this.price=this.orderData.data['price'];
     this.status=this.orderData.data['status'];
    this.updated_data.status= this.status;
      // this.router.navigate(['cart/checkout/confirmed-order']);
      console.log(this.orderData,this.price,this.status);
      });
  }
   updated_data=new update;

     updatePayment( ){

      this.OrdersService.updateOrders(this.id,this.updated_data).subscribe(data => {
        localStorage.removeItem('token_id');
         this.router.navigate(['cart/checkout/confirmed-order']);

       console.log(data);
         });
     }
    //  do(){
    // this.updatePayment(2);
    //  };
  pay(amount: any) {

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: (token: any)=> {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        localStorage.setItem('token_id' ,JSON.stringify(token.id) );
        // this.token=token.id
        // console.log( this.token_id)
        console.log("hi");
        this.updated_data.payment_id=2;
        this.updatePayment();
        alert('Token Created!!');
      },

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
            // localStorage.setItem('token_id' ,JSON.stringify(token.id) );
            // this.token_id=token.id
            // this.updated_data.payment_id=2;
            // this. updatePayment();
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
      // if((localStorage.getItem('token_id'))){
      //   this.updated_data.payment_id=2;
      //   this. updatePayment();
      // }
    }
  }

   private initConfig(): void {
      this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.price,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value:this.price
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.price,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {


        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.payment=3;
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
        this.updated_data.payment_id=3;
        this. updatePayment();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    }


  cash(){
    console.log("hi");
    this.updated_data.payment_id=1;
    this. updatePayment();
  }
}
