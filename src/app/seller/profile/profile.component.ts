import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  logeduser:any
  id:any;
  data:any;
  token:any;
  typerole:any;
  constructor(private registerService :RegisterService) {
    
   }

  ngOnInit(): void {
   this.logeduser= this.registerService.getloginuser()
   console.log(this.logeduser)
   this.id=this.logeduser.id;
   this.token= this.logeduser.token
   this.typerole=this.logeduser.user_type
    console.log(this.id)
  }
  updateuser(updateForm : any){
    console.log(updateForm.value)
    this.registerService.updateuser(this.id,updateForm.value).subscribe(res=>{
        this.registerService.saveCurrentUser(this.id,updateForm.value.name , updateForm.value.email , this.token,updateForm.value.address,updateForm.value.phone,this.typerole);
        
      console.log(res)
    })
  }


}
