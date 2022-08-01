import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css']
})
export class AccountdetailsComponent implements OnInit {
  logeduser:any
  id:any;
  data:any;
  token:any;
  constructor(private registerService :RegisterService) {
    
   }

  ngOnInit(): void {
   this.logeduser= this.registerService.getloginuser()
   console.log(this.logeduser)
   this.id=this.logeduser.id;
   this.token= this.logeduser.token
    console.log(this.id)
  }
  updateuser(updateForm : any){
    console.log(updateForm.value)
    this.registerService.updateuser(this.id,updateForm.value).subscribe(res=>{
        this.registerService.saveCurrentUser(this.id,updateForm.value.name , updateForm.value.email , this.token,updateForm.value.address,updateForm.value.phone);
        
      console.log(res)
    })
  }

}
