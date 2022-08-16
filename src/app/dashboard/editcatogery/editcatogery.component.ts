import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Catogery } from 'src/app/category';
import { CatogeryService } from 'src/app/services/catogery.service';


@Component({
  selector: 'app-editcatogery',
  templateUrl: './editcatogery.component.html',
  styleUrls: ['./editcatogery.component.css']
})
export class EditcatogeryComponent implements OnInit {
  category=new Catogery();
  id:any;
  data:any;
  constructor(private _CatogeryService:CatogeryService,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getDatabyid();
  }
  getDatabyid(){
    this._CatogeryService.getData(this.id).subscribe(res=>{
      this.data=res;
      this.category=this.data.data
      console.log(this.category)
    })
  }
  updatecategory(){
    this._CatogeryService.updatecategory(this.id,this.category).subscribe(res=>{
 this.router.navigate(['/dashboard/', 'allcatogery']);
      console.log(res)
    })
   
  }

}
