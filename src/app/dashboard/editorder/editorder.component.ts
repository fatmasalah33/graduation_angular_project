import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

import { Order } from './../../order';
@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.css']
})
export class EditorderComponent implements OnInit {
  id:any;
  data:any;
  order=new Order()
  constructor(private orderService :OrdersService,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getDatabyid();
  }
  getDatabyid(){
    this.orderService.getData(this.id).subscribe(res=>{
      this.data=res;
      this.order=this.data.data
    })
  }
  updateOrders(){
    this.orderService.updateOrders(this.id,this.order).subscribe(res=>{
      // this.router.navigate(['/dashboard/', 'allproduct']);
      console.log(res)
    })
  }

}
