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
  admins : Array<any> = [];
  sellers : Array<any> = [];
  ngOnInit(): void {
    this.getallusers()
  }
  getallusers(){
    this._UserService.getUserList().subscribe((data : any) => {
      this.users=data.users ;
      this.admins=data.admin ;
      this.sellers=data.sellers ;
      console.log(data.users)
      });
}
}
