import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { OffersService } from './../../services/offers.service';
@Component({
  selector: 'app-alloffers',
  templateUrl: './alloffers.component.html',
  styleUrls: ['./alloffers.component.css']
})
export class AlloffersComponent implements OnInit {
  offers : Array<any> = [];
  logeduser:any
  userid:any;
  constructor(private offersService :OffersService,private activatedRoute: ActivatedRoute,
    private registerService :RegisterService) { 
      this.registerService.currentUsers.subscribe((data)=>{
        console.log(data)
  
        if(data != null )
        {
          this.logeduser= this.registerService.getloginuser()
          console.log(this.logeduser)
          this.userid=this.logeduser.id;
          }
        
       
          
    
     
  
       })
    }

  ngOnInit(): void {
    this.getalloffers()
  }
  getalloffers(){
    this.offersService.getAllOffers(this.userid).subscribe((res : any) => {
      this.offers =res ;
      console.log(res.data.offeres)
      });
  }
  deleteoffer(id: any){
    this.offersService.deleteoffer(id).subscribe(data => {
      this.getalloffers()
      });

  }
}
