import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatButton } from "@angular/material/button";
import { ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import product from '../../types/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [MatButtonModule,RouterLink,MatButton, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products:product[]=[]
   displayedColumns: string[] = [ 'name', 
'details',
'brandId',
'purchasePrice',
'salePrice',
'availableQuantity','action'];
    dataSource!: MatTableDataSource<product>;
  productService=inject(ProductService)
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor() {
    
      // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
  
      
      // this.dataSource = new MatTableDataSource(users);
    }
  
    ngOnInit() {
   this.productService.getProducts().subscribe(result=>{
   this.initTable(result);
   })
      
    }
  
    initTable(data:product[]) {
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
}
