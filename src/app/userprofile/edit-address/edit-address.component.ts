import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/address';
import { RegisterService } from 'src/app/services/register.service';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
address=new Address()
id:any;
states : Array<any> = [];
  cities:Array<any> = [];
  constructor(private registerService :RegisterService,private activatedRoute: ActivatedRoute
    , private OrdersService :OrdersService,private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getaddressbyid()
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
getaddressbyid(){
this.registerService.getAddressByID(this.id).subscribe((data : any)=>{
  this.address=data
  console.log(data)
})
}
updateaddress(){
  this.registerService.updateMyAddress(this.id,this.address).subscribe(data=>{
    this.router.navigate(['/userprofile/', 'addressbook'])
    console.log(data)
  })
}
}
