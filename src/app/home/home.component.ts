import { Component, OnInit } from '@angular/core';
import { CatogeryService } from '../services/catogery.service';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories : Array<any> = [];
  productOffered: Array<any> = [];
  pathimage:any="http://127.0.0.1:8000/public/image/";
  constructor(private _CatogeryService:CatogeryService ,private _OffersService:OffersService ) { }

  ngOnInit(): void {
    this.getallcategories()
    this.getOffersproduct()
  }
  getallcategories(){
    this._CatogeryService.getmainCategory().subscribe((data : any) => {
      this.categories =data.data.categories ;
      console.log(data.data.categories)
      });
  }
  getOffersproduct(){
    this._OffersService.productOffered().subscribe((data : any)=>{
      console.log(data)
      this.productOffered=data
    })
  }
 
}
