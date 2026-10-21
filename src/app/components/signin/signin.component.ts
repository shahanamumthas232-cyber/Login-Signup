import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';  

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { Customer } from '../../interfaces/customer';



@Component({
  selector: 'app-signin',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    IftaLabelModule,
    NgIf,

  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router)

  signupForm!: FormGroup;
  loading = false;

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', []),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    })


  }

  onSubmit() {
    console.log("onSubmit");
    try {
      if (this.signupForm.valid) {
        const userData = this.signupForm.value;
        this.saveUserData(userData);
        this.loading = true;
        this.authService.userSignin(this.signupForm.value).subscribe(
          data => {
            console.log(data);
            this.loading = false;
            this.router.navigate(['/otpVerification']);

          },
          error => {
            this.loading = false;
            console.error('Error posting data:', error);
          }
        )

      }
    } catch (error) {
      console.log(error);

    }


  }


saveUserData(data: Customer) {

  const userDataString = JSON.stringify(data);
  localStorage.setItem('user_signup_data', userDataString);
  console.log('User signup data successfully stored in localStorage.');
  
}



// Create an observable
// const observable = new Observable((subscriber) => {
//   subscriber.next("Hello");
//   subscriber.next("World");
//   setTimeout(() => {
//     subscriber.next("After 2 seconds");
//     subscriber.complete(); // No more data
//   }, 2000);
// });

// Subscribe to it
// observable.subscribe({
//   next: (value) => console.log("Got value:", value),
//   error: (err) => console.error("Error:", err),
//   complete: () => console.log("Stream complete"),
// });

// import { Subject } from 'rxjs';

// const subject = new Subject();

// // Subscribe to it
// subject.subscribe(value => console.log("Subscriber A:", value));
// subject.subscribe(value => console.log("Subscriber B:", value));

// // Push values
// subject.next(1);
// subject.next(2);


}
