import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/review';
import { OrdersService } from 'src/app/services/orders.service';
import { RegisterService } from 'src/app/services/register.service';
import { ReviweService } from 'src/app/services/reviwe.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: any;
  review=new Review();
  id: any;
  order: any;
  order_id:any
  logeduser:any
  user_id: any;
  constructor(private activatedRoute: ActivatedRoute,private registerService :RegisterService,
    private _ReviweService:ReviweService) {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.order_id=this.activatedRoute.snapshot.params['order_id'];
    console.log(this.activatedRoute.snapshot.params['id'])
    console.log(this.activatedRoute.snapshot.params['order_id'])
   }

  ngOnInit(): void {
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.user_id=this.logeduser.id;
  }
  countStar(star:any) {
    this.selectedValue = star;
    console.log('Value of star', star);
    console.log(this.selectedValue)
    this.review.rating=this.selectedValue
}

insertreview(reviewForm:any){

this.review.user_id=this.user_id
 this.review.product_id=this.id
 this.review.order_id=this.order_id
console.log(this.review)
this._ReviweService.insertReviwe(this.review).subscribe((data : any)=>{
  console.log(data)
})
}

}
