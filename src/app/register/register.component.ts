import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Register } from '../register';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  yourname:string = ''
  email: string = ''
  password: string = ''
  role:any
  isSubmitted:boolean  = false;
  register=new Register()
  erroremail:string = ''
  errorphone: string = ''
  constructor(private registerService :RegisterService,private router: Router) { }

  ngOnInit(): void {
  }
  handleSubmitForm(registerForm : any){
    console.log(registerForm.invalid);
    this.isSubmitted = true;
    this.registerService.insertdate(this.register).subscribe(data => {
      this.router.navigate(['/', 'verificationcode']);
      console.log('hi')
      },err=>{
         console.log(err)
        if(!registerForm.invalid){
          if(err.error.errors.email){
            this.erroremail=err.error.errors.email
          }
          if(err.error.errors.phone){
            this.errorphone=err.error.errors.phone

          }
          console.log(err.error.errors.email)
          console.log(err.error.errors.phone)
        }
       
      });
      
  }
}
