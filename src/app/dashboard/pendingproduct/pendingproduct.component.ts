import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pendingproduct',
  templateUrl: './pendingproduct.component.html',
  styleUrls: ['./pendingproduct.component.css']
})
export class PendingproductComponent implements OnInit {
  products : Array<any> = [];
  pathimage:any="http://127.0.0.1:8000/public/image/";
  totalRecords: number | undefined; 
  page: number = 1
  constructor(private productsService :ProductsService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getallproducts()

  }
  verfiyproduct(id:any){
    this.productsService.verifyProduct(id).subscribe((data:any)=>{
      console.log(data)
      this.getallproducts()
      this.toastr.success('The Product has been successfully verify');
      
    })
  }
  getallproducts(){
    this.productsService.notVerifiedProducts().subscribe((data : any) => {
       this.products =data.data.products ;
       this.totalRecords=data.data.products.length
      console.log(data)
      });
  }

}
