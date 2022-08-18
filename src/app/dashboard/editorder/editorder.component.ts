import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
 
  constructor(private toastr: ToastrService,private orderService :OrdersService,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    // this.order.status="change the order status"
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getDatabyid();
  }
  getDatabyid(){
    this.orderService.getData(this.id).subscribe((res: any)=>{
      this.order=res;
      // this.order=this.data.data
      console.log(res)
    })
  }
  updateOrders(){
    console.log(this.order)
    this.orderService.updateOrders(this.id,this.order).subscribe(res=>{
      this.router.navigate(['/dashboard/', 'allorder']);
      this.toastr.warning('The order Status has been successfully update');
      console.log(res)
    })
  }

}
