import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-checkoutseller',
  templateUrl: './checkoutseller.component.html',
  styleUrls: ['./checkoutseller.component.css']
})
export class CheckoutsellerComponent implements OnInit {
  pathimage:any="http://127.0.0.1:8000/public/image/";
  products : any;
  logeduser:any
  userid:any;
  totalRecords: number | undefined; 
  page: number = 1
  constructor(private productsService :ProductsService,private activatedRoute: ActivatedRoute
    ,private registerService :RegisterService) { }

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
    this.productsService.getMoney(this.userid).subscribe((data : any) => {
      this.products =data ;
      this.totalRecords=data.products.order_details.length
      console.log(data)
      });
  }

}
