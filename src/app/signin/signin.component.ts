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
  isSubmitted:boolean  = false;
  constructor(private registerService :RegisterService,private router: Router) { }

  ngOnInit(): void {
  }
  
  handleSubmitForm(loginForm : any){
    console.log(loginForm.invalid);
    this.isSubmitted = true;
    this.registerService.login(loginForm.value).subscribe(data => {
      console.log(data)
    //  this.router.navigate(['/']);
      if(data.status === "success")
      {
        
        this.registerService.saveCurrentUser(data.user.id,data.user.name , data.user.email , data.token,data.user.address,data.user.phone,data.user_type);
        this.registerService.loginuser(data.user)
        // this.registerService.settusername(data.user.name)
        console.log( this.registerService.getloginuser())
    
        // this.router.navigate(['/']); 
        if(data.user_type=='admin') {
          window.location.href="http://localhost:4200/dashboard"
        }
        if(data.user_type=='seller') {
          window.location.href="http://localhost:4200/seller"
        }
        if(data.user_type=='buyer') {
          window.location.href="http://localhost:4200"
        }
      
       
      }
      },err=>{
        console.log(err.error.error)
        if(!loginForm.invalid){
          this.flag = true;
        }
       
      }
      );
      
  }
}
