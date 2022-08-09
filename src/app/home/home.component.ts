import { Component, OnInit } from '@angular/core';
import { CatogeryService } from '../services/catogery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories : Array<any> = [];
  constructor(private _CatogeryService:CatogeryService ) { }

  ngOnInit(): void {
    this.getallcategories()
  }
  getallcategories(){
    this._CatogeryService.getmainCategory().subscribe((data : any) => {
      this.categories =data.data.categories ;
      console.log(data.data.categories)
      });
  }
 
}
