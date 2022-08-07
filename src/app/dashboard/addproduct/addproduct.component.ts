import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { formatDate } from '@angular/common';
import { CatogeryService } from 'src/app/services/catogery.service';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  file:any ;
  categories : Array<any> = [];
  constructor(public fb:FormBuilder, private productsService :ProductsService
    ,private router: Router,private _CatogeryService:CatogeryService ) {
   this.form = this.fb.group({

    name: ['', [Validators.required,
    ]],
      price :['', [Validators.required,
        Validators.pattern('^[0-9]+$')
      ]],
      description:['', [Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ]],
      brand:['', [Validators.required,
      ]],
      quantity :['', [Validators.required,
      ]],
      user_id:18,
      category_id:['', [Validators.required,
      ]],
      image:['', [Validators.required,
      ]] ,

    })
  }

  form : FormGroup ;

  product=new Product()
  ngOnInit(): void {
    this.getallcategories()
  }
  getallcategories(){
    this._CatogeryService.getcategoriesList().subscribe((data : any) => {
      this.categories =data.data.categories ;
      console.log(data.data.categories)
      });
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
