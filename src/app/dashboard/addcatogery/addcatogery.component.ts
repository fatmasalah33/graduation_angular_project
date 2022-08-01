import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Catogery } from 'src/app/category';
import { CatogeryService } from 'src/app/services/catogery.service';

@Component({
  selector: 'app-addcatogery',
  templateUrl: './addcatogery.component.html',
  styleUrls: ['./addcatogery.component.css']
})
export class AddcatogeryComponent implements OnInit {
category=new Catogery();
  constructor(private _CatogeryService:CatogeryService,private router: Router) { }

  ngOnInit(): void {
  }
  insertdate(){
    this._CatogeryService.insertdate(this.category).subscribe(data => {
      this.router.navigate(['/dashboard/', 'allcatogery']);
      console.log('ok')
      });
    
    }
}
