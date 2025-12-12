import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import Brand from '../../../types/brand';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-brand-form',
  imports: [MatFormFieldModule,MatButtonModule,MatInputModule , FormsModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name!:string
brandService=inject(BrandService)
router=inject(Router)
  Toastr=inject(ToastrService)
route=inject(ActivatedRoute)
brand!:Brand
ngOnInit() {
  
  const id = this.route.snapshot.params['id'];
  if(id){
    this.brandService.getBrand(id).subscribe((result)=>{
      this.brand =result
      this.name=result.name
    })

  }
}

  addBrand(){

    if(!this.name){
alert("please enter brand name");
return;
    }
    let brand:Brand={
      name:this.name
    };
     this.brandService.addBrand(brand).subscribe((result)=>{
      this.Toastr.success('Brand added successfully')
    this.router.navigateByUrl('/brands')
    });
  }
  updateBrand(){

    if(!this.name){
this.Toastr.error("please enter brand name");
return;
    }
    let brand:Brand={
      id:this.brand.id,
      name:this.name
    };
     this.brandService.updateBrand(brand).subscribe((result)=>{
      this.Toastr.success('Brand update successfully')
    this.router.navigateByUrl('/brands')
    });
  }

}
