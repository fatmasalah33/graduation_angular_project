import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  totalRecords: number | undefined; 
  page: number = 1
  constructor(private offersService :OffersService,private activatedRoute: ActivatedRoute,
    private registerService :RegisterService,private toastr: ToastrService) { 
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
      this.offers =res.data.offeres ;
      console.log(this.offers)
      this.totalRecords=res.data.offeres.length
    
      });
  }
  deleteoffer(id: any){
    this.offersService.deleteoffer(id).subscribe(data => {
      this.getalloffers()
      this.toastr.error('The offer has been successfully delete');
      });

  }
  getoffer(event: any){
    console.log(event.target.value)
    if(event.target.value == 1){
this.offersService.continuesoffer(this.userid).subscribe((res: any)=>{
  this.offers =res.data.offeres ;
 
  this.totalRecords=res.data.offeres.length
 
})
    }else if(event.target.value == 2){
      this.offersService.expiredoffers(this.userid).subscribe((res: any)=>{
        this.offers =res.data.offeres ;
        this.totalRecords=res.data.offeres.length
     
      })
    }

  }
}
