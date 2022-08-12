import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
   pathimage:any="http://127.0.0.1:8000/public/image/";
  products : Array<any> = [];
  logeduser:any
  userid:any;
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
    this.productsService.getProductsListuser(this.userid).subscribe((data : any) => {
      this.products =data.data.products ;
      console.log(data.data.products)
      });
  }
  deleteproduct(id: any){
    this.productsService.deleteproduct(id).subscribe(data => {
      this.getallproducts()
      });

  }
  

}
