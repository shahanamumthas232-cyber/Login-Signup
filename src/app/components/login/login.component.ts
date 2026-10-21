import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
// import { ToastModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Customer } from '../../interfaces/customer';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    NgIf,
    RouterModule
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private authservice = inject(AuthService);
  router = inject(Router);

  loginForm!: FormGroup;
  formSubmitted = false;
  message: string = '';

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

  }


 onSubmit() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    
    this.authservice.userLogin(email, password).subscribe({
      next: (res: { token: string, customer: Customer }) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.customer._id);
        this.authservice.updateLoginStatus();
        this.router.navigate(['/home']);
      },
      error: (err: any) => { 
        console.log("error message :", err.error.message);
        console.error('Login failed:', err);
        this.message = err.error.message;
        console.log("message" ,this.message);
        
      },
    });
}
}
