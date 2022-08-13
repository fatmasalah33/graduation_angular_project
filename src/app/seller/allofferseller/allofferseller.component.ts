import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-allofferseller',
  templateUrl: './allofferseller.component.html',
  styleUrls: ['./allofferseller.component.css']
})
export class AlloffersellerComponent implements OnInit {

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
