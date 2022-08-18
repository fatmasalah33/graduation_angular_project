import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-verified-product',
  templateUrl: './verified-product.component.html',
  styleUrls: ['./verified-product.component.css']
})
export class VerifiedProductComponent implements OnInit {

  pathimage:any="http://127.0.0.1:8000/public/image/";
  products : Array<any> = [];
  logeduser:any
  userid:any;
  totalRecords: number | undefined; 
  page: number = 1
  constructor(private productsService :ProductsService,private activatedRoute: ActivatedRoute
    ,private registerService :RegisterService,private toastr: ToastrService) { }

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
      this.totalRecords=data.data.products.length
      console.log(data.data.products)
      });
  }
  deleteproduct(id: any){
    this.productsService.deleteproduct(id).subscribe(data => {
      this.getallproducts()
      this.toastr.error('The product has been successfully deleted');
      });

  }
  


}
