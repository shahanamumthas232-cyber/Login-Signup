import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  updateLoginStatus(){
    this.isLoggedIn.set(!!localStorage.getItem('token'));
  }

  logout(){
    localStorage.clear();
    this.isLoggedIn.set(false);
  }

  userSignin(customer: { name: string; email: string; password: string }): Observable<{ message: string }> {
    // console.log("from the service (signup)", customer);
    return this.http.post<{ message: string }>(this.api + "/signin", customer);
  }

  otpVerificaton(data: Auth): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.api + "/verifyOtp", data);
  }
  userLogin(email: string, password: string): Observable<{ token: string, customer: Customer }> {
    const loginData = { email, password };
    // console.log("from the service", loginData);
    return this.http.post<{ token: string, customer: Customer }>(this.api + "/login", loginData)
  }

}
