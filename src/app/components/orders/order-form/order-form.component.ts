import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import Brand from '../../../types/brand';
import { ProductService } from '../../../services/product.service';

import { ActivatedRoute, Router } from '@angular/router';
import order from '../../../types/order';
import { OrderService } from '../../../services/order.service';
import product from '../../../types/product';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-order-form',
 imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatInputModule , FormsModule,MatSelectModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {


  Toastr=inject(ToastrService)


  
    formBuilder=inject(FormBuilder)
  orderForm =this.formBuilder.group<order>({



orderNo:'',
productId:'',
quantity:null,
salePrice:null,
discount:null,
totalAmount:null,


  })


    orderService=inject(OrderService)
    productService=inject(ProductService)
    brands:Brand[]=[]
    router=inject(Router)
    products:product[]=[]
    order!:order

route=inject(ActivatedRoute)


    ngOnInit() {
      let id = this.route.snapshot.params['id']
      if(id){

        this.orderService.getOrder(id).subscribe((result=>{
          this.order=result
          this.orderForm.patchValue(this.order)
          
                
                   this.productService.getProducts().subscribe((result)=>{
        this.products=result
      
        this.selectedProduct=this.products.find(x=>x.id === Number(this.order.productId))
     this.productService.getProducts().subscribe(result=>this.products=result);
      this.orderForm.controls.productId.disable()
     })

        }))
      }else{
  this.productService.getProducts().subscribe((result)=>{
        this.products=result
      
        this.selectedProduct=this.products.find(x=>x.id === Number(this.order.productId))
     this.productService.getProducts().subscribe(result=>this.products=result);
     })
      }
      this.orderForm.controls.orderNo.addValidators(Validators.required);
      this.orderForm.controls.productId.addValidators(Validators.required);
      this.orderForm.controls.quantity.addValidators(Validators.required);
    
    this.updateTotalAmount()

    }

    addOrder(){


      if(this.orderForm.invalid){
        this.Toastr.success('Please provide all details')

        return;
      }

     let formValue = this.orderForm.getRawValue() as order;
     this.orderService.addOrder(formValue).subscribe(()=>{
      alert('Your order added sucessfully');
      this.router.navigateByUrl('/orders')
     })
    }

   updateOrder(){
         if(this.orderForm.invalid){
        this.Toastr.error('Please provide all details')

        return;
      }

     let order:order = this.orderForm.getRawValue() as order;
     this.orderService.updateOrder(this.order.id! ,order).subscribe(()=>{
      alert('Your order update sucessfully');
      this.router.navigateByUrl('/orders')
     })
   }



    updateTotalAmount(){
      this.orderForm.valueChanges.subscribe(()=>{
        this.orderForm.controls.totalAmount.enable({emitEvent:false});
        if(this.orderForm.getRawValue().productId && this.orderForm.value.quantity){
          let total = this.selectedProduct?.salePrice! * this.orderForm.value.quantity - 
          (this.orderForm.value.discount || 0);
          this.orderForm.controls.totalAmount.setValue(total,{emitEvent:false});

        }else{
        this.orderForm.controls.totalAmount.disable({emitEvent:false});
    }})
    }

    selectedProduct?:product
    productSelected(productId:number){
      this.selectedProduct=this.products.find(x=>x.id==productId)
      this.orderForm.controls.salePrice.enable();
      this.orderForm.controls.salePrice.setValue(this.selectedProduct?.salePrice!);
           this.orderForm.controls.salePrice.disable();
    }
}
