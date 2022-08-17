import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-allofferseller',
  templateUrl: './allofferseller.component.html',
  styleUrls: ['./allofferseller.component.css']
})
export class AlloffersellerComponent implements OnInit {

  offers : Array<any> = [];
  logeduser:any
  userid:any;
  constructor(private offersService :OffersService,private activatedRoute: ActivatedRoute
    ,private registerService :RegisterService) { 
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
      console.log(res)
      this.offers =res ;
     
      });
  }
  deleteoffer(id: any){
    this.offersService.deleteoffer(id).subscribe(data => {
      this.getalloffers()
      });

  }
  getoffer(event: any){
    console.log(event.target.value)
    if(event.target.value == 1){
this.offersService.continuesoffer(this.userid).subscribe((res: any)=>{
  this.offers =res ;
 
})
    }else if(event.target.value == 2){
      this.offersService.expiredoffers(this.userid).subscribe((res: any)=>{
        this.offers =res ;
     
      })
    }

  }
}
