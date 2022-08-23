import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { CartService } from '../services/cart.service';
import { Order } from '../order';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  lastAddressid:any
   form:FormGroup
   address:FormGroup
   user_id:any
  logeduser: any
  price : any;
  Order=new Order()
  states : Array<any> = [];
  cities:Array<any> = [];
  AddressArray:Array<any> = [];
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
      // address_state:['', [Validators.required,
      // ]],
      // address_city :['', [Validators.required,
      // ]],
      // address_street :['', [Validators.required,
      // ]],
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
     this.getallstates()
    //  console.log(this.token);
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
    });
     this.submitOrder();
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
      formData.append("buyeraddresse_id",( this.form.controls['address_detail'].value)?( this.form.controls['address_detail'].value):this.lastAddressid);
      console.log(formData)
      // && ((this.form.controls['payment_id'].value==1))|| ((this.form.controls['payment_id'].value==2) && (localStorage.getItem('token_id')))  || (this.showSuccess)
       if (  (( this.form.controls['address_detail'].value) || this.lastAddressid) ) {

         this.OrdersService.insertdate(formData).subscribe(data => {

        this.router.navigate(['cart/checkout/confirmed-order']);
        console.log(data)
        });}
        else {
          alert("please check  your address  ");
          // console.log( this.token.id)
        }
       console.log(this.form.value);

   }

    // paypal(price:any){
    //   this.OrdersService.payment().subscribe(data=>{
    //      console.log(data);
    //   }
    //   )
    // }


    // address ya rab y mo3een
    // get address for each buyer  if exist

    getAddress(){
      this.OrdersService.getBuyerAddress(this.user_id).subscribe((data :any)=>{
        console.log(data);
        this.AddressArray=data;
        console.log(this.AddressArray);
      })
      }

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

        })
      }

}
