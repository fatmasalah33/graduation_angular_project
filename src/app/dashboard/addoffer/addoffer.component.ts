import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../offer';
import { Router } from '@angular/router';
import { FormGroup , FormBuilder} from '@angular/forms';
import { formatDate } from '@angular/common';
import { RegisterService } from 'src/app/services/register.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.css']
})
export class AddofferComponent implements OnInit {
  form : FormGroup ;
  offer=new Offer()
  products : Array<any> = [];
  logeduser:any
  userid:any;
  constructor(public fb:FormBuilder, private offerService :OffersService,private router: Router
    ,private registerService :RegisterService,private productsService :ProductsService) { 
    this.form = this.fb.group({

      end_at :null,
      percent :null,
      product_id:null,

    })
  }

  ngOnInit(): void {
    this.registerService.currentUsers.subscribe((data)=>{
      console.log(data)

      if(data != null )
      {
        this.logeduser= this.registerService.getloginuser()
        console.log(this.logeduser)
        this.userid=this.logeduser.id;
        }
      
     
        
  
   

     })
    this.getallproducts()

  }
  
  getallproducts(){
    this.productsService.getProductsListuser(this.userid).subscribe((data : any) => {
      this.products =data.data.products ;
      console.log(data.data.products)
      });
  }
  insertdate(){
    // let data = new FormData;
    const formData :any = new FormData;
    formData.append("end_at" , this.form.controls['end_at'].value);
    formData.append("percent" , this.form.controls['percent'].value);
    formData.append("product_id" , this.form.controls['product_id'].value);
    

    this.offerService.insertdate(formData).subscribe(data => {
      this.router.navigate(['/dashboard/', 'alloffer']);
      console.log('f')
      });
    //  console.log(this.form.value);

    }
}
