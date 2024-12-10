import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';
  constructor(private http:HttpClient) { }
  token=localStorage.getItem("jwtToken")
  public registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  public getId():Observable<any>
  {
    const email=localStorage.getItem("email");
    const TokenStr = "Bearer " + this.token;
    const headers = new HttpHeaders().set("Authorization", TokenStr);
    return this.http.get(`http://localhost:8080/api/uId?email=${email}`, { headers })
  }
  

}
