import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(public fb:FormBuilder,private _RegisterService:RegisterService,private router: Router
    ,private activatedRoute: ActivatedRoute) { 
    this.upadepassForm= this.fb.group({

   
      password :['', ],
      
  
      })
      console.log(this.activatedRoute.snapshot.params['id']);
      this.id=this.activatedRoute.snapshot.params['id'];
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
