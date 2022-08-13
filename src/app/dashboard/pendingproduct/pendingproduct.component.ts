import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pendingproduct',
  templateUrl: './pendingproduct.component.html',
  styleUrls: ['./pendingproduct.component.css']
})
export class PendingproductComponent implements OnInit {
  products : Array<any> = [];
  constructor(private productsService :ProductsService) { }

  ngOnInit(): void {
    this.getallproducts()

  }
  
  getallproducts(){
    this.productsService.notVerifiedProducts().subscribe((data : any) => {
      // this.products =data.data.products ;
      console.log(data)
      });
  }

}
