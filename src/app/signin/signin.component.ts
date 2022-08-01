import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
login=new Login();
email: string = ''
  password: string = ''
  errorMessage:string ='';
  flag:boolean  = false;
  
  constructor(private registerService :RegisterService,private router: Router) { }

  ngOnInit(): void {
  }
  handleSubmitForm(loginForm : any){
    console.log(loginForm);
    this.registerService.login(loginForm.value).subscribe(data => {
      console.log(data.status)
    //  this.router.navigate(['/']);
      if(data.status === "success")
      {
        
        this.registerService.saveCurrentUser(data.user.id,data.user.name , data.user.email , data.token,data.user.address,data.user.phone);
        
        this.router.navigate(['/']);  
        
      }
      else
      {  this.flag = true;
        this.errorMessage = data.message;
        console.log(this.errorMessage)
        
      }
      });
      
  }
}
