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
  register=new Register()
  constructor(private registerService :RegisterService,private router: Router) { }

  ngOnInit(): void {
  }
  handleSubmitForm(registerForm : any){
    console.log(registerForm);
    this.registerService.insertdate(this.register).subscribe(data => {
      this.router.navigate(['/', 'verificationcode']);
      console.log('hi')
      });
      
  }
}
