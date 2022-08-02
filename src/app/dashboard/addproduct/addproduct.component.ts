import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { FormGroup , FormBuilder} from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  file:any ;
  constructor(public fb:FormBuilder, private productsService :ProductsService,private router: Router) {
   this.form = this.fb.group({

      name :null,
      price :null,
      description:null,
      brand:null,
      quantity :null,
      user_id:1,
      category_id:null,
      image:null ,

    })
  }
  form : FormGroup ;

  product=new Product()
  ngOnInit(): void {
  }
  uploadImage($event:Event){
        this.file =($event?.target as HTMLInputElement)?.files?.[0];
        console.log(this.file);
        this.form.patchValue({
          image : this.file,

        })

  }
  insertdate(){
    // let data = new FormData;
    const formData :any = new FormData;

    formData.append("image" ,this.file,this.file.name);
    formData.append("name" , this.form.controls['name'].value);
    formData.append("description" , this.form.controls['description'].value);
    formData.append("quantity" , this.form.controls['quantity'].value);
    formData.append("category_id" , this.form.controls['category_id'].value);
    formData.append("user_id" , this.form.controls['user_id'].value);
    formData.append("price" , this.form.controls['price'].value);
    formData.append("brand" , this.form.controls['brand'].value);

    this.productsService.insertdate(formData).subscribe(data => {
      this.router.navigate(['/dashboard/', 'allproduct']);
      console.log('f')
      });
    //  console.log(this.form.value);

    }
}
