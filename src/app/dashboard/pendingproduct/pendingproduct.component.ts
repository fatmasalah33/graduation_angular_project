import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pendingproduct',
  templateUrl: './pendingproduct.component.html',
  styleUrls: ['./pendingproduct.component.css']
})
export class PendingproductComponent implements OnInit {
  products : Array<any> = [];
  pathimage:any="http://127.0.0.1:8000/public/image/";
  constructor(private productsService :ProductsService) { }

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
    this.productsService.notVerifiedProducts().subscribe((data : any) => {
       this.products =data.data.products ;
      console.log(data)
      });
  }

}
