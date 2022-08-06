import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/login';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
      console.log(data)
    //  this.router.navigate(['/']);
      if(data.status === "success")
      {
        
        this.registerService.saveCurrentUser(data.user.id,data.user.name , data.user.email , data.token,data.user.address,data.user.phone,data.user_type);
        this.registerService.loginuser(data.user)
        // this.registerService.settusername(data.user.name)
        console.log( this.registerService.getloginuser())
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
