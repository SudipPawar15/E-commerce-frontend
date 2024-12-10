import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from 'src/app/common/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders';  

  constructor(private http: HttpClient) {}

  
  placeOrder(order: Orders): Observable<Orders> {
    const token = localStorage.getItem('jwtToken'); 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<Orders>(this.apiUrl, order, { headers });
  }
}
