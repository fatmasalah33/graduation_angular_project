import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/offer';
import { OffersService } from 'src/app/services/offers.service';
import { ProductsService } from 'src/app/services/products.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-addofferseller',
  templateUrl: './addofferseller.component.html',
  styleUrls: ['./addofferseller.component.css']
})
export class AddoffersellerComponent implements OnInit {

  form : FormGroup ;
  offer=new Offer()
  products : Array<any> = [];
  logeduser:any
  userid:any;
  isSubmitted:boolean  = false;
  constructor(public fb:FormBuilder, private offerService :OffersService,private router: Router
    ,private registerService :RegisterService,private productsService :ProductsService,private toastr: ToastrService) { 
    this.form = this.fb.group({

      end_at :['', [Validators.required,
      ]],
      percent :['', [Validators.required,
        Validators.pattern('^[0-9]+$')
      ]],
      product_id:['', [Validators.required,
      ]],

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
    this.productsService.VerifiedProduct_seller(this.userid).subscribe((data : any) => {
      this.products =data.data.products ;
      console.log(data.data.products)
      });
  }
  insertdate(){
    this.isSubmitted = true;
    // let data = new FormData;
    const formData :any = new FormData;
    formData.append("end_at" , this.form.controls['end_at'].value);
    formData.append("percent" , this.form.controls['percent'].value);
    formData.append("product_id" , this.form.controls['product_id'].value);
    

    this.offerService.insertdate(formData).subscribe(data => {
      this.router.navigate(['/seller/', 'alloffer']);
      this.toastr.success('The offer has been successfully added');
      console.log('f')
      });
    //  console.log(this.form.value);

    }

}
