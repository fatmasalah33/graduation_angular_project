import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
order:Array<any> = [];
logeduser:any
userid:any;
  constructor(private _OrdersService:OrdersService,private _RegisterService:RegisterService) { }
  pathimage:any="http://127.0.0.1:8000/public/image/";
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
    this._OrdersService.getorderofuser(this.userid).subscribe((data : any)=>{
this.order=data.data
console.log(this.order[0])
    })
  }

}
