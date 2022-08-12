import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { ReviweService } from 'src/app/services/reviwe.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  products:Array<any> = [];
  logeduser:any
  pathimage:any="http://127.0.0.1:8000/public/image/";
  userid:any;
  constructor(private _ReviweService:ReviweService,private _RegisterService:RegisterService) { }

  ngOnInit(): void {
    this._RegisterService.currentUsers.subscribe((data:any)=>{
      console.log(data)

      if(data  )
      {
        this.logeduser= this._RegisterService.getloginuser()
          this.userid=this.logeduser.id;
        
     
       
     
        
      }
       

     })
 
    this.getdata();
  }
getdata(){
  this._ReviweService.getproducttoreview(this.userid).subscribe((data : any)=>{
    this.products=data.products
    console.log(this.products[0])
  })
}
}
