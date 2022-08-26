import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { CartService } from '../services/cart.service';
import { Order } from '../order';
import { Cart } from '../cart';
import { RegisterService } from '../services/register.service';
// import { render } from 'creditcardpayments/creditCardPayments'
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  lastAddressid:any
   form:FormGroup
   address:FormGroup
   user_id:any
  logeduser: any
  price : any;
  Order=new Order()
  handler:any = null;
  token:any;
  states : Array<any> = [];
  cities:Array<any> = [];
  AddressArray:Array<any> = [];
  showSuccess: boolean = false;
  payment: any;
  isSubmitted:boolean  = false;
  constructor(public fb:FormBuilder, private OrdersService :OrdersService,private router: Router,private _CartService:CartService,private registerService :RegisterService) {
    this.address=this.fb.group({
      yourname:null,
      phone:null,
      address_state:['', [Validators.required,
      ]],
      address_city :['', [Validators.required,
      ]],
      address_street :['', [Validators.required,
      ]],
     user_id :this.user_id,
    })

    this.form = this.fb.group({
      yourname:null,
     phone:null,
     copoun:null,
      price:this.price,
      comment:null,
      address_detail:null,
      address_state:['', [Validators.required,
      ]],
      address_city :['', [Validators.required,
      ]],
      address_street :['', [Validators.required,
      ]],
     user_id :this.user_id,
      payment_id:null,


    })
    // render({
    //   id: '#myPaypalButton',
    //   currency: 'USD' ,
    //   value: this.price ,
    //   onApprove :(details)=> {
    //      alert("success transaction")
    //   },
    // })

  }

  ngOnInit(): void {
    this.registerService.currentUsers.subscribe((data:any)=>{
      console.log(data)
       console.log(this.price)
      if(data)
      {
        this.logeduser= this.registerService.getloginuser()
        console.log(this.logeduser)
        this.user_id=this.logeduser.id;
        console.log(this.user_id)
      }

     })
     this.gettotal();
    //  this.loadStripe();
     this.getallstates()
    //  console.log(this.token);
    // this.initConfig();
    this.getAddress();


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
    this.isSubmitted = true;
    // let data = new FormData;

   if( this.form.controls['yourname'].value ) {
    const insertAddress:any = new FormData;
    insertAddress.append("name" , this.form.controls['yourname'].value);
    insertAddress.append("phone" , this.form.controls['phone'].value);
    insertAddress.append("address_state" , this.form.controls['address_state'].value);
    insertAddress.append("address_city" , this.form.controls['address_city'].value);
    insertAddress.append("address_street" , this.form.controls['address_street'].value);
    insertAddress.append("user_id" , this.user_id);
    this.OrdersService.AddnewAddress(insertAddress).subscribe((data :any)=>{
      this.lastAddressid=data;

      localStorage.setItem("lastAddress", this.lastAddressid);
      // console.log(this.lastAddressid)
      this.submitOrder();




      console.log(this.lastAddressid)


    });

     }
     else  this.submitOrder();
    }

   submitOrder(){
    const formData :any = new FormData;
    //  console.log(this.token.id)
    console.log(this.user_id)
      // formData.append("status" , this.form.controls['status'].value);
      formData.append("price" , this.price);
      // formData.append("comment" , this.form.controls['comment'].value);
      formData.append("user_id" , this.user_id);
      // formData.append("payment_id" , ( this.form.controls['payment_id'].value)? this.form.controls['payment_id'].value : this.payment );
      formData.append("copoun" , this.form.controls['copoun'].value);
      formData.append("buyeraddresse_id",( this.form.controls['address_detail'].value)?( this.form.controls['address_detail'].value):localStorage.getItem("lastAddress"));
      // localStorage.removeItem("lastAddress");
      console.log(formData,localStorage.getItem("lastAddress"))
       if (  ( this.form.controls['address_detail'].value)||localStorage.getItem("lastAddress") ) {

      this.OrdersService.insertdate(formData).subscribe(data => {
        localStorage.removeItem("lastAddress") ;
        // this.router.navigate(['cart/checkout/confirmed-order']);
        this.router.navigate(['cart/checkout/payment/'+data]);
        console.log(data,)

        });}

        else {
          alert("please check address you want to deliver in " + this.lastAddressid);
          // console.log( this.token.id)
        }
      //  console.log(this.form.value);

   }



    // pay(amount: any) {

    //   var handler = (<any>window).StripeCheckout.configure({
    //     key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
    //     locale: 'auto',
    //     token: function (token: any) {
    //       // You can access the token ID with `token.id`.
    //       // Get the token ID to your server-side code for use.
    //       console.log(token)
    //       localStorage.setItem('token_id' ,JSON.stringify(token.id) );
    //       // this.token=token.id
    //       // console.log( this.token_id)
    //       alert('Token Created!!');
    //     }
    //   });

    //   handler.open({
    //     name: 'welcome to pay',
    //     description: 'please enter your data',
    //     amount: amount
    //   });

    // }

    // loadStripe() {

    //   if(!window.document.getElementById('stripe-script')) {
    //     var s = window.document.createElement("script");
    //     s.id = "stripe-script";
    //     s.type = "text/javascript";
    //     s.src = "https://checkout.stripe.com/checkout.js";
    //     s.onload = () => {
    //       this.handler = (<any>window).StripeCheckout.configure({
    //         key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
    //         locale: 'auto',
    //         token: function (token: any) {
    //           // You can access the token ID with `token.id`.
    //           // Getr server-side cod the token ID to youe for use.
    //           console.log(token.id)
    //           localStorage.setItem('token_id' ,JSON.stringify(token.id) );
    //           // this.token_id=token.id
    //           alert('Payment Success!!');
    //         }
    //       });
    //     }

    //     window.document.body.appendChild(s);
    //   }
    // }





    // paypal(price:any){
    //   this.OrdersService.payment().subscribe(data=>{
    //      console.log(data);
    //   }
    //   )
    // }




    // private initConfig(): void {
    //   this.payPalConfig = {
    //   currency: 'USD',
    //   clientId: 'sb',
    //   createOrderOnClient: (data) => <ICreateOrderRequest>{
    //     intent: 'CAPTURE',
    //     purchase_units: [
    //       {
    //         amount: {
    //           currency_code: 'USD',
    //           value: '.1',
    //           breakdown: {
    //             item_total: {
    //               currency_code: 'USD',
    //               value: '.1'
    //             }
    //           }
    //         },
    //         items: [
    //           {
    //             name: 'Enterprise Subscription',
    //             quantity: '1',
    //             category: 'DIGITAL_GOODS',
    //             unit_amount: {
    //               currency_code: 'USD',
    //               value: '.1',
    //             },
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   advanced: {
    //     commit: 'true'
    //   },
    //   style: {
    //     label: 'paypal',
    //     layout: 'vertical'
    //   },
    //   onApprove: (data, actions) => {
    //     this.payment=3;
    //     console.log('onApprove - transaction was approved, but not authorized', data, actions);
    //     actions.order.get().then((details: any) => {
    //       console.log('onApprove - you can get full order details inside onApprove: ', details);
    //     });
    //   },
    //   onClientAuthorization: (data) => {
    //     this.payment=3;
    //     console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    //     this.showSuccess = true;
    //   },
    //   onCancel: (data, actions) => {
    //     console.log('OnCancel', data, actions);
    //   },
    //   onError: err => {
    //     console.log('OnError', err);
    //   },
    //   onClick: (data, actions) => {
    //     console.log('onClick', data, actions);
    //   },
    // };
    // }





    // address ya rab y mo3een
    // get address for each buyer  if exist

    getAddress(){
      this.OrdersService.getBuyerAddress(this.user_id).subscribe((data :any)=>{
        console.log(data);
        this.AddressArray=data.data;
        console.log(this.AddressArray);
      })
      }
      // insertAddress:any

      addAddress(){
        const insertAddress:any = new FormData;
        insertAddress.append("name" , this.address.controls['yourname'].value);
        insertAddress.append("phone" , this.address.controls['phone'].value);
        insertAddress.append("address_state" , this.address.controls['address_state'].value);
        insertAddress.append("address_city" , this.address.controls['address_city'].value);
        insertAddress.append("address_street" , this.address.controls['address_street'].value);
        insertAddress.append("user_id" , this.user_id);
        console.log(this.address)
        this.OrdersService.AddnewAddress(insertAddress).subscribe((data :any)=>{
          this.lastAddressid=data;
          console.log( this.address);
          this.getAddress();

        })
      }

}
