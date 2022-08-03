import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  orders : Array<any> = [];
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
 
}
