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
  ngOnInit(): void {
    this.getallreviews()
  }
  getallreviews(){
    this._ReviweService.getReviweList().subscribe((data : any) => {
      this.reviews=data.data.reviews ;
      console.log(data.data.reviews)
      });
  }
}
