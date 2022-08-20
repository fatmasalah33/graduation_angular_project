import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  
  upadepassForm: FormGroup ;
  id: any;
  isSubmitted:boolean  = false;
  constructor(public fb:FormBuilder,private _RegisterService:RegisterService,private router: Router
    ,private activatedRoute: ActivatedRoute) { 
    this.upadepassForm= this.fb.group({

   
      password :['', [Validators.required,
        Validators.minLength(6)
      ]],
      
  
      })
      console.log(this.activatedRoute.snapshot.params['id']);
      this.id=this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }
  handleSubmitForm(upadepassForm:any){
    this.isSubmitted = true;
    console.log(upadepassForm.invalid);
    this._RegisterService.updatepassword(this.id,upadepassForm.value).subscribe((data:any)=>{
      console.log(data)
      if(!upadepassForm.invalid){
      this.router.navigate(['/']);  
      }  
    },err=>{
      console.log(err.error.message)
    })

  }

}
