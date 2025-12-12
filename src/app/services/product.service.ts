import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import product from './../types/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  httpClient= inject(HttpClient)


  getProducts(){
 return this.httpClient.get<product[]>(environment.apiUrl +'/products')
  }
  getProduct(id:string){
return this.httpClient.get<product>(`${environment.apiUrl}/products/${id}`);

 
  }


   addProduct(product:product){
    return this.httpClient.post<product>(environment.apiUrl +'/products',product)
  }

   updateProduct(id:number,product:product){
  return this.httpClient.put<product>(`${environment.apiUrl}/products/${id}`, product);
  }
}
