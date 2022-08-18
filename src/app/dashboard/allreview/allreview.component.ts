import { Component, OnInit } from '@angular/core';
import { ReviweService } from 'src/app/services/reviwe.service';

@Component({
  selector: 'app-allreview',
  templateUrl: './allreview.component.html',
  styleUrls: ['./allreview.component.css']
})
export class AllreviewComponent implements OnInit {

  constructor(private _ReviweService:ReviweService) { }
  reviews : Array<any> = [];
  totalRecords: number | undefined; 
  page: number = 1
  ngOnInit(): void {
    this.getallreviews()
  }
  getallreviews(){
    this._ReviweService.getReviweList().subscribe((data : any) => {
      this.reviews=data.data.reviews ;
      this.totalRecords=data.data.reviews.length
      console.log(data.data.reviews)
      });
  }
}
