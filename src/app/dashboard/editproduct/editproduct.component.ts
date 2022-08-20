import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatogeryService } from 'src/app/services/catogery.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../product';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  id:any;
  data:any;
  product=new Product()
  categories : Array<any> = [];
  constructor(private productsService :ProductsService,private _CatogeryService:CatogeryService,
    private toastr: ToastrService ,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getDatabyid();
    this.getallcategories()
  }
  getallcategories(){
    this._CatogeryService.allsubcat().subscribe((data : any) => {
      this.categories =data.subcat ;
      console.log(data.subcat)
      });
  }
  getDatabyid(){
    this.productsService.getData(this.id).subscribe(res=>{
      this.data=res;
      this.product=this.data.data
      console.log(this.data.data)
    })
  }
  updateproduct(){
    this.productsService.updateproduct(this.id,this.product).subscribe(res=>{
      this.router.navigate(['/dashboard/', 'allproduct']);
      this.toastr.warning('The product has been successfully update');
      console.log(res)
    })
  }
  

}
