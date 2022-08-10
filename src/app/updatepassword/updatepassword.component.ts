import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  logeduser:any
  id:any;
  upadepassForm: FormGroup ;
  constructor(public fb:FormBuilder,private _RegisterService:RegisterService,private router: Router) { 
    this.upadepassForm= this.fb.group({

   
      password :['', ],
      
  
      })
      this.logeduser= this._RegisterService.getloginuser()
      console.log(this.logeduser)
      this.id=this.logeduser.id;
  }

  ngOnInit(): void {
  }
  handleSubmitForm(upadepassForm:any){
    console.log(upadepassForm.value);
    this._RegisterService.updatepassword(this.id,upadepassForm.value).subscribe((data:any)=>{
      this.router.navigate(['/']);  
      console.log(data)
    })

  }

}
