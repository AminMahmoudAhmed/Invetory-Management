import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrandService } from '../../../services/brand.service';
import Brand from '../../../types/brand';
import { ProductService } from '../../../services/product.service';
import product from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ɵInternalFormsSharedModule,ReactiveFormsModule ,MatSelectModule],
templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  Toastr=inject(ToastrService)
  builder=inject(FormBuilder)
  productForm :FormGroup=this.builder.group({


name:['' ,[ Validators.required]],
details:[''],
brandId:['',[ Validators.required]],
purchasePrice:['',[ Validators.required]],
salePrice:['',[ Validators.required]],
availableQuantity:['',[ Validators.required]]


  })

  brandService=inject(BrandService)
  productService=inject(ProductService)
  brands:Brand[]=[]
  router=inject(Router)
  route=inject(ActivatedRoute)
  product!:product

ngOnInit() {
   const id = this.route.snapshot.params['id'];
   
this.brandService.getBrands().subscribe(result=>this.brands=result)
if(id){
    this.productService.getProduct(id).subscribe((result)=>{
      this.product =result
      this.productForm.patchValue(this.product);
  
    });
  
}
}

  addProduct(){

    if(this.productForm.invalid){

      this.Toastr.success('please provide all the delails')
      return
    }
    let product:product=this.productForm.value
    this.productService.addProduct(product).subscribe(result=>{
    alert('Your product is added sucessfully')
   
    this.router.navigateByUrl('/products')
    })
  }

    updateProduct(){
  
      if(this.productForm.invalid){

      this.Toastr.error('please provide all the delails')
      return
    }
    let product:product=this.productForm.value
    this.productService.updateProduct(this.product.id,product).subscribe(result=>{
    this.Toastr.success('Your product is update sucessfully')
   
    this.router.navigateByUrl('/products')
    })
  }
    }
  

