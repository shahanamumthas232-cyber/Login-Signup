import { Component, inject } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { NgIf, NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-otp',
  imports: [
    FormsModule,
    NgStyle,
    InputOtpModule,
    ButtonModule
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  private authService = inject(AuthService)
  router = inject(Router);
  value!: number;


  onSubmit() {
    console.log(this.value);

    if (this.value) {
      const userDataString = localStorage.getItem('user_signup_data');
      if (userDataString) {

        const userDetails = JSON.parse(userDataString);
        const verificationData = { ...userDetails, otp: this.value }
        console.log(verificationData);

        this.authService.otpVerificaton(verificationData).subscribe(
          (response) => {
            console.log('OTP verification successful', response);
            localStorage.clear();
            this.router.navigate(['/login'])
          },
          (error) => {
            console.error('OTP verification failed', error);
          }
        );
      } else {
        console.error('User data not found in localStorage.');
      }
    }else{
      console.log("enetr valid code");
      
    }


  }





}
