import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/offer';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-editofferseller',
  templateUrl: './editofferseller.component.html',
  styleUrls: ['./editofferseller.component.css']
})
export class EditoffersellerComponent implements OnInit {
  form : FormGroup ;
  offer=new Offer()
  id: any;
  constructor(private toastr: ToastrService,
    public fb:FormBuilder,private activatedRoute: ActivatedRoute, private offerService :OffersService,private router: Router
  ) { this.form = this.fb.group({

    end_at :null,
    percent :null,
    product_id:null,

  })
}

ngOnInit(): void {
  console.log(this.activatedRoute.snapshot.params['id']);
  this.id=this.activatedRoute.snapshot.params['id'];
  this.getDatabyid();
}
getDatabyid(){
this.offerService.getData(this.id).subscribe((data:any)=>{
this.offer= data
console.log(data)
})
}
updatedate(){
this.offerService.updateoffer(this.id,this.offer).subscribe((data : any)=>{
  this.router.navigate(['/seller/', 'alloffer']);
  this.toastr.warning('The offer has been successfully updated');
console.log(data)
})
}

}
