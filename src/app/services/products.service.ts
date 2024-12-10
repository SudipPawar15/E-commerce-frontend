import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  token = localStorage.getItem("jwtToken");
  private apiUrl = 'http://localhost:8080/api';

  public getProducts(): Observable<any> {
    const TokenStr = "Bearer " + this.token;
    const headers = new HttpHeaders().set("Authorization", TokenStr);
    return this.http.get<any>(`${this.apiUrl}/products`, { headers });
  }

  public getProductListPaginate(thePage: number,
                                thePageSize: number
  ):Observable<any>{
    const TokenStr = "Bearer " + this.token;
    const headers = new HttpHeaders().set("Authorization", TokenStr);
    return this.http.get<any>(`${this.apiUrl}/products?pageNo=${thePage}&pageSize=${thePageSize}`, { headers });
  }
}
