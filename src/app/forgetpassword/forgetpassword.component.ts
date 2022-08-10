import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  forgetForm: FormGroup ;
  constructor(public fb:FormBuilder,private _RegisterService:RegisterService,private router: Router) { 
    this.forgetForm = this.fb.group({

   
      email :['', ],
      
  
      })
  }

  ngOnInit(): void {
  }
  handleSubmitForm(forgetForm:any){
    console.log(forgetForm.value);
    this._RegisterService.forgetpassword(forgetForm.value).subscribe((data:any)=>{
      this.router.navigate(['/', 'recoveryInstructions']);
      console.log(data)
    })

  }

}
