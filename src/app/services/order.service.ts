import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import order from '../types/order';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class  OrderService {

  constructor() { }
  httpClient =inject(HttpClient)

  getOrders(){
 return this.httpClient.get<order[]>(environment.apiUrl+'/orders')
  }
  addOrder(order:order){
 return this.httpClient.post<order>(environment.apiUrl+'/orders',order)
  }
  updateOrder(id:string,order:order){
 return this.httpClient.put<order>(`${environment.apiUrl}/orders/${id}`,order)
 
  }




 getOrder(id:string){
 return this.httpClient.get<order>(`${environment.apiUrl}/orders/${id}`)

  }
 deleteOrder(id:string){
 return this.httpClient.delete(`${environment.apiUrl}/orders/${id}`)

  }

   
}
