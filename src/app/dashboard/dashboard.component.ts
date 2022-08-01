import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products : Array<any> = [];
  constructor(private productsService :ProductsService) { }

  ngOnInit(): void {
    this.getallproducts()
  }
  getallproducts(){
    this.productsService.getProductsList().subscribe((data : any) => {
      this.products =data.data.products ;
      console.log(data.data.products)
      });
  }
}
