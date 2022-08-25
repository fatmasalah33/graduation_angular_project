import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  logeduser:any
  id:any;
  data:any;
  token:any;
  typerole:any;
  address:FormGroup
  AddressArray:Array<any> = [];
  isSubmitted:boolean  = false;
  states : Array<any> = [];
  cities:Array<any> = [];
  constructor(public fb:FormBuilder,private registerService :RegisterService
    , private OrdersService :OrdersService,private router: Router) { 
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.id=this.logeduser.id;
    this.address=this.fb.group({
      yourname:null,
      phone:null,
      address_state:['', [Validators.required,
      ]],
      address_city :['', [Validators.required,
      ]],
      address_street :['', [Validators.required,
      ]],
     user_id :this.id,
    })
  }

  ngOnInit(): void {
    this.alladdress();
    this.getallstates()
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
alladdress(){
  this.registerService.getMyAddress(this.id).subscribe((data : any)=>{
    this.AddressArray=data.data;
    console.log(this.AddressArray);
  })
}
addAddress(){
  this.isSubmitted = true;
  const insertAddress:any = new FormData;
  insertAddress.append("name" , this.address.controls['yourname'].value);
  insertAddress.append("phone" , this.address.controls['phone'].value);
  insertAddress.append("address_state" , this.address.controls['address_state'].value);
  insertAddress.append("address_city" , this.address.controls['address_city'].value);
  insertAddress.append("address_street" , this.address.controls['address_street'].value);
  insertAddress.append("user_id" , this.id);
  console.log(this.address)
  this.OrdersService.AddnewAddress(insertAddress).subscribe(data =>{
    
    console.log( data);
   this.router.navigate(['/userprofile/', 'addressbook'])

  })
}
deleteaddress(id: any){
  this.registerService.deletMyAddress(id).subscribe(data=>{
    this.alladdress();
console.log(data)
  })
} 

}
