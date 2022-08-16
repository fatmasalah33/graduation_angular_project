import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/status';
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  orders : Array<any> = [];
  status=new Status()
  constructor(private orderService :OrdersService,private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.getallorders()
  }
  getallorders(){
    this.orderService.getOrdersList().subscribe((res : any) => {
      this.orders =res.data ;
      console.log(res.data);
      console.log(res);
      });
  }
  getstatus(event: any){
this.status.status=event.target.value
console.log(this.status)
this.orderService.filterbystatus(this.status).subscribe((data : any)=>{
console.log(data)
this.orders =data.data ;
})
  }
}
