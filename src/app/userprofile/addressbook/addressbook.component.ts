import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.css']
})
export class AddressbookComponent implements OnInit {
  logeduser:any
  id:any;
  data:any;
  token:any;
  typerole:any;
  
  AddressArray:Array<any> = [];
  isSubmitted:boolean  = false;
  states : Array<any> = [];
  cities:Array<any> = [];
  constructor(public fb:FormBuilder,private registerService :RegisterService
    , private OrdersService :OrdersService) { 
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.id=this.logeduser.id;
 
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
deleteaddress(id: any){
  this.registerService.deletMyAddress(id).subscribe(data=>{
    this.alladdress();
console.log(data)
  })
} 
}
