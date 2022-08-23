import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatogeryService } from 'src/app/services/catogery.service';
import { SizeService } from 'src/app/services/size.service';

@Component({
  selector: 'app-addsize',
  templateUrl: './addsize.component.html',
  styleUrls: ['./addsize.component.css']
})
export class AddsizeComponent implements OnInit {
  isSubmitted:boolean  = false;
  categories : Array<any> = [];
  constructor(private _CatogeryService:CatogeryService,private _SizeService:SizeService
    ,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getallcategories()
  }

  getallcategories(){
    this._CatogeryService.getmainCategory().subscribe((data : any) => {
      this.categories =data.data.categories ;
      console.log(data.data.categories)
      });
  }
  insertdate(sizeform:any){
    this.isSubmitted = true;
    console.log(sizeform.value)
this._SizeService.insertdate(sizeform.value).subscribe((data:any)=>{
  console.log(data)
  this.router.navigate(['/dashboard/', 'sizes']);
  this.toastr.success('The size has been successfully added');
})
 
    
    }
}
