import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Verification } from '../verification';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent implements OnInit {

verifiateForm: FormGroup ;
  constructor(public fb:FormBuilder,private _RegisterService:RegisterService) { 
    this.verifiateForm = this.fb.group({

      verification_code: [''],
      email :['', ],
      
  
      })
  }

  ngOnInit(): void {
  }
  handleSubmitForm(verifiateForm:any){
    console.log(verifiateForm.value);
    this._RegisterService.code(verifiateForm.value).subscribe((data:any)=>{
      console.log(data)
    })

  }

}
