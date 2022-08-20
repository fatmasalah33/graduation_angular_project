import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  id:any;
  data:any;
  order:any
  pathimage:any="http://127.0.0.1:8000/public/image/";
  constructor(private _OrdersService:OrdersService,private activatedRoute: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getDatabyid();
  }
  getDatabyid(){
    this._OrdersService.getData(this.id).subscribe((res: any)=>{
      this.order=res.data;
      // this.order=this.data.data
      console.log(res)
      console.log(this.order)
    })
  }
  cancelldorder(id:any){
console.log(id)
this._OrdersService.cancelldorder(id).subscribe((data: any)=>{
  console.log(data)
})
  }
}
