import { Component, OnInit } from '@angular/core';
import { Copun } from '../copun';
import { OrdersService } from '../services/orders.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
copoun=new Copun()
logeduser:any
  user_id: any;
  name:any
  erroremail:string = ''
  constructor(private registerService :RegisterService,private _OrdersService:OrdersService) { }

  ngOnInit(): void {
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.user_id=this.logeduser.id;
    this.name=this.logeduser.name
  }
  isSubmitted:boolean  = false;
  successemai:string = ''
  insertemail(copunForm:any){
    this.isSubmitted = true;
    console.log(copunForm.value)
this.copoun.user_id=this.user_id
this.copoun.name=this.name
console.log(this.copoun)
console.log(copunForm)
this._OrdersService.getCopoun(this.copoun).subscribe((data : any)=>{
  console.log(data)
  this.successemai=data.message
},err=>{
  console.log(err)

   if(err.error.message){
     this.erroremail=err.error.message
   }

})
  }
}
