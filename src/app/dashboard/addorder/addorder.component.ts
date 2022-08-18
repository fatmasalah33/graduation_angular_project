import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Product } from '../../product';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {
  file:any ;
  form : FormGroup ;

  product=new Product()
  constructor(public fb:FormBuilder, private OrdersService :OrdersService,private router: Router,
    private toastr: ToastrService) { 
    this.form = this.fb.group({

      status :null,
      price :null,
      comment:null,
      address_state:null,
      address_city :null,
      address_street :null,
      user_id:1,
      payment_id:null,
      copoun:null ,

    })

  }

  ngOnInit(): void {
  }
  insertdate(){
    // let data = new FormData;
    const formData :any = new FormData;

    
    formData.append("status" , this.form.controls['status'].value);
    formData.append("price" , this.form.controls['price'].value);
    formData.append("comment" , this.form.controls['comment'].value);
    formData.append("address_state" , this.form.controls['address_state'].value);
    formData.append("address_city" , this.form.controls['address_city'].value);
    formData.append("address_street" , this.form.controls['address_street'].value);
    formData.append("user_id" , this.form.controls['user_id'].value);
    formData.append("payment_id" , this.form.controls['payment_id'].value);
    formData.append("copoun" , this.form.controls['copoun'].value);

    this.OrdersService.insertdate(formData).subscribe(data => {
      this.router.navigate(['/dashboard/', 'allorders']);
      console.log('f')
      });
    //  console.log(this.form.value);

    }
}
