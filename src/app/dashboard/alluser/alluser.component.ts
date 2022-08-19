import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {

  constructor(private _UserService:UserService) { }
  users : Array<any> = [];

  totalRecords: number | undefined;

  page: number = 1
  ngOnInit(): void {
    this.getallusers()
  }
  getallusers(){
    this._UserService.alluser().subscribe((data : any) => {
      this.users=data ;
   
      this.totalRecords=data.length

      });
}
getrole(event: any){
  console.log(event.target.value)
if(event.target.value=='users'){
  this._UserService.getUserList().subscribe((data : any) => {
    this.users=data.users ;
 
    this.totalRecords=data.users.length

    });
}else if(event.target.value=='admin'){
  
  this._UserService.getUserList().subscribe((data : any) => {
    this.users=data.admin ;
 
    this.totalRecords=data.admin.length

    });
}else if(event.target.value=='sellers'){
  this._UserService.getUserList().subscribe((data : any) => {
    this.users=data.sellers ;
 
    this.totalRecords=data.sellers.length
   
    });
}
}
}
