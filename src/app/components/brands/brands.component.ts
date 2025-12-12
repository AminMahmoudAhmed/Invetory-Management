import { Component, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import Brand from '../../types/brand';
import { BrandService } from '../../services/brand.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-brands',
  imports: [MatButton, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
 displayedColumns: string[] = [ 'name', 'action'];
  dataSource!: MatTableDataSource<Brand>;
brandService=inject(BrandService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
  
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
 this.brandService.getBrands().subscribe(result=>{
 this.initTable(result);
 })
    
  }

  initTable(data:Brand[]) {
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


