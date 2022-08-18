import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/product';
import { CatogeryService } from 'src/app/services/catogery.service';
import { ProductsService } from 'src/app/services/products.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-addproductseller',
  templateUrl: './addproductseller.component.html',
  styleUrls: ['./addproductseller.component.css']
})
export class AddproductsellerComponent implements OnInit {

  file:any ;
  categories : Array<any> = [];
  logeduser:any
  userid:any;
  constructor(public fb:FormBuilder, private productsService :ProductsService,private toastr: ToastrService
    ,private router: Router,private _CatogeryService:CatogeryService ,private registerService :RegisterService) {
      this.registerService.currentUsers.subscribe((data)=>{
        console.log(data)
  
        if(data != null )
        {
          this.logeduser= this.registerService.getloginuser()
          console.log(this.logeduser)
          this.userid=this.logeduser.id;
          }
        
       
          
    
     
  
       })
      this.form = this.fb.group({

    name: ['', [Validators.required,
    ]],
      price :['', [Validators.required,
        Validators.pattern('^[0-9]+$')
      ]],
      description:['', [Validators.required,
       
      ]],
      brand:['', [Validators.required,
      ]],
      quantity :['', [Validators.required,
      ]],
      user_id:this.userid,
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
      this.router.navigate(['/seller/', 'notVerifiedProduct']);
      this.toastr.success('The product has been successfully added');
      console.log('f')
      });
    //  console.log(this.form.value);

    }
}
