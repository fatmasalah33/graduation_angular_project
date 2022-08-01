import { Component, OnInit } from '@angular/core';
import { CatogeryService } from 'src/app/services/catogery.service';

@Component({
  selector: 'app-allcatogery',
  templateUrl: './allcatogery.component.html',
  styleUrls: ['./allcatogery.component.css']
})
export class AllcatogeryComponent implements OnInit {
  categories : Array<any> = [];
  constructor(private _CatogeryService:CatogeryService ) { }

  ngOnInit(): void {
    this.getallcategories()
  }
  getallcategories(){
    this._CatogeryService.getcategoriesList().subscribe((data : any) => {
      this.categories =data.data.categories ;
      console.log(data.data.categories)
      });
  }
  deletecategory(id: any){
    this._CatogeryService.deletecategory(id).subscribe(data => {
      this.getallcategories()
      });

  }
}
