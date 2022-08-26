import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/product';
import { CatogeryService } from 'src/app/services/catogery.service';
import { ProductsService } from 'src/app/services/products.service';
import { RegisterService } from 'src/app/services/register.service';
import{sizeData} from '../../sizedata';
@Component({
  selector: 'app-addproductseller',
  templateUrl: './addproductseller.component.html',
  styleUrls: ['./addproductseller.component.css']
})
export class AddproductsellerComponent implements OnInit {
  sizeArray:Array<any>=[];
  file:any ;
  categories : Array<any> = [];
  logeduser:any
  userid:any;
  isSubmitted:boolean  = false;
  // sizeArray:Array<any>=[];
  obj: sizeData={
    size: undefined,
    quantity: undefined
  };
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
      description:[''],
      brand:[''],
      quantity :['', [Validators.required,
        Validators.pattern('^[0-9]+$')
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
    this._CatogeryService.allsubcat().subscribe((data : any) => {
      this.categories =data.subcat ;
      console.log(data.subcat)
      });
  }
  uploadImage($event:Event){
        this.file =($event?.target as HTMLInputElement)?.files?.[0];
        console.log(this.file);
        this.form.patchValue({
          image : this.file,

        })

  }
  errorimg:string = ''
  insertdate(){
    this.isSubmitted = true;
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
  //   for (let size of this.sizeArray) {
  //     formData.append('sizes[]', size);
  // }
  for (let size of this.sizedata) {

    formData.append('sizes[]', JSON.stringify(size));
}
    this.productsService.insertdate(formData).subscribe(data => {
      this.router.navigate(['/seller/', 'notVerifiedProduct']);
      this.toastr.success('The product has been successfully added');
      console.log(data)
      },err=>{
        if(!formData.invalid){
          console.log(err)
        if(err.error.errors.image){

this.errorimg=err.error.errors.image
        }
      }
      });
    //  console.log(this.form.value);

    }
    categorySize:Array<any>=[];
    getsizeOfCategory(event:any){
     this.productsService.getsizes(event.target.value).subscribe((data:any)=>{
       console.log(data);
       this.categorySize=data;
     })

   }
   index:any;
  //  selectSize(event:any){
  //    if(event.target.checked){
  //      this.sizeArray.push(event.target.value) ;
  //    }
  //    else {
  //      this.index =this.sizeArray.indexOf(event.target.value)
  //      this.sizeArray.splice(this.index,1)
  //    }
  //   console.log(this.sizeArray)
  //     }

      sizedata:Array<any>=[];
      selectSize(event:any){
        if(event.target.checked){
          this.sizeArray.push(event.target.value) ;
          console.log(event)
          console.log(event.target.offsetParent.lastChild.value);
        }
        else {
          this.index =this.sizeArray.indexOf(event.target.value)
          this.sizeArray.splice(this.index,1);
          this.sizedata.splice(this.index,1);
          console.log(this.sizedata);
        }
       console.log(this.sizeArray)
         }

         setqantityOfSize(event:any){
          console.log(event);
          console.log(event.target.offsetParent.firstChild.value);
         this.obj=new sizeData;
              this.obj.size=event.target.offsetParent.firstChild.value;
              this.obj.quantity=event.target.value;
              // if( this.obj.quantity!="")
              this.sizedata.push(this.obj);

             console.log(this.sizedata);
              console.log(this.obj);
         }
}
