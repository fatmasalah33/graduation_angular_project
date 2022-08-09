import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-chpassword',
  templateUrl: './chpassword.component.html',
  styleUrls: ['./chpassword.component.css']
})
export class ChpasswordComponent implements OnInit {
  form : FormGroup ;
  logeduser:any
  id:any;
  constructor(public fb:FormBuilder,private registerService :RegisterService) { 
    this.form = this.fb.group({

      oldpassword: ['', [Validators.required,
      ]],
      newpassword: ['', [Validators.required,Validators.minLength(6)
      ]],
      confirmpassword: ['', [Validators.required,
      ]],

     
  
      })
  }

  ngOnInit(): void {
    this.logeduser= this.registerService.getloginuser()
    console.log(this.logeduser)
    this.id=this.logeduser.id;
    console.log(this.id)
  }
  insertdate(form: any){
    console.log(form.value)
    this.registerService.changepassword(this.id,form.value).subscribe((data : any)=>{
      console.log(data)
    })

  }
}
