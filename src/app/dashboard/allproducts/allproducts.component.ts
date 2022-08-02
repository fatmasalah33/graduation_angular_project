import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
  pathimage:any="http://127.0.0.1:8000/public/image/";
  products : Array<any> = [];
  constructor(private productsService :ProductsService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getallproducts()

  }
  getallproducts(){
    this.productsService.getProductsList().subscribe((data : any) => {
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
