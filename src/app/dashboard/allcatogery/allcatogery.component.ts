import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CatogeryService } from 'src/app/services/catogery.service';

@Component({
  selector: 'app-allcatogery',
  templateUrl: './allcatogery.component.html',
  styleUrls: ['./allcatogery.component.css']
})
export class AllcatogeryComponent implements OnInit {
  categories : Array<any> = [];
  totalRecords: number | undefined; 
  page: number = 1
  constructor(private _CatogeryService:CatogeryService ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getallcategories()
  }
  getallcategories(){
    this._CatogeryService.getcategoriesList().subscribe((data : any) => {
      this.categories =data.data.categories ;
      this.totalRecords=data.data.categories.length
      console.log(data.data.categories)
      });
  }
  deletecategory(id: any){
    this._CatogeryService.deletecategory(id).subscribe(data => {
      this.getallcategories()
      this.toastr.error('The category has been successfully delete');
      });

  }
}
