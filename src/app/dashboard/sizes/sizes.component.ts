import { Component, OnInit } from '@angular/core';
import { SizeService } from 'src/app/services/size.service';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit {
  sizes : Array<any> = [];
  totalRecords: number | undefined; 
  page: number = 1
  constructor(private _SizeService:SizeService) { }

  ngOnInit(): void {
    this.getalldata()
  }
getalldata(){
  this._SizeService.getsizeList().subscribe((data : any)=>{
    console.log(data)
    this.sizes=data 
    this.totalRecords=data.length
  })
}
deletesize(id: any){
this._SizeService.deletesize(id).subscribe(any=>{
  this.getalldata()
})

}
}
