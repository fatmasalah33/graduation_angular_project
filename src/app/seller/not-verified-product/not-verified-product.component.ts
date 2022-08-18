import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-not-verified-product',
  templateUrl: './not-verified-product.component.html',
  styleUrls: ['./not-verified-product.component.css']
})
export class NotVerifiedProductComponent implements OnInit {
  logeduser:any
  userid:any;
  products : Array<any> = [];
  pathimage:any="http://127.0.0.1:8000/public/image/";
  totalRecords: number | undefined; 
  page: number = 1
  constructor(private productsService :ProductsService,private registerService :RegisterService) {
    this.registerService.currentUsers.subscribe((data)=>{
      console.log(data)

      if(data != null )
      {
        this.logeduser= this.registerService.getloginuser()
        console.log(this.logeduser)
        this.userid=this.logeduser.id;
        }
      
     
        
  
   

     })
   }

  ngOnInit(): void {
    this.getallproducts()

  }
  verfiyproduct(id:any){
    this.productsService.verifyProduct(id).subscribe((data:any)=>{
      console.log(data)
      this.getallproducts()
    })
  }
  getallproducts(){
    this.productsService.notVerifiedProduct_seller(this.userid).subscribe((data : any) => {
       this.products =data.data.products ;
       this.totalRecords=data.data.products.length
      console.log(data)
      });
  }

}
