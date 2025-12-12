import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatButton, MatButtonModule } from "@angular/material/button";
import { ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import product from '../../types/product';
import { ProductService } from '../../services/product.service';
import order from '../../types/order';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-orders',
  imports: [MatButtonModule,RouterLink,MatButton, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

 products:product[]=[]
 orders:order[]=[]
   displayedColumns: string[] = [
 "orderNo",
 "productId",
"quantity",
 "salePrice",
"discount",
 "totalAmount",
'action'];
    dataSource!: MatTableDataSource<order>;
  orderService=inject(OrderService)
  productService=inject(ProductService)
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
  Toastr=inject(ToastrService)



  ngOnInit() {
   this.orderService.getOrders().subscribe(result=>{
   this.initTable(result);
   })
      
    }
  
  
    initTable(data:order[]) {
    this.dataSource=new MatTableDataSource(data);
   this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

     getProductName(id:number){
return this.products.find((x)=>x.id == id)?.name;
}


cancelOrder(order:order){
this.orderService.deleteOrder(order.id!).subscribe(()=>{
  this.Toastr.error('Order Cancle')
  this.productService.getProduct(order.productId).subscribe((product)=>{
    product.availableQuantity =+product.availableQuantity +order.quantity!;
    this.productService.updateProduct(product.id,product).subscribe()
  })
  this.orders=this.orders.filter((x)=>x.id != order.id)
      this.dataSource.data = this.orders;

   
})
}
}










