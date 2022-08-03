import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { OffersService } from './../../services/offers.service';
@Component({
  selector: 'app-alloffers',
  templateUrl: './alloffers.component.html',
  styleUrls: ['./alloffers.component.css']
})
export class AlloffersComponent implements OnInit {
  offers : Array<any> = [];
  constructor(private offersService :OffersService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getalloffers()
  }
  getalloffers(){
    this.offersService.getoffersList().subscribe((res : any) => {
      this.offers =res.data.offeres ;
      console.log(res.data.offeres)
      });
  }
  deleteoffer(id: any){
    this.offersService.deleteoffer(id).subscribe(data => {
      this.getalloffers()
      });

  }
}
