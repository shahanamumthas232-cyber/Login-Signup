import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { OtpComponent } from './components/otp/otp.component';
// import { DashbordComponent } from './components/dashbord/dashbord.component';

import { signupGuard } from './guards/signup.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'otpVerification',
        canActivate: [signupGuard],
        component: OtpComponent,
    },
    {
        path: 'home',
        component: HomeComponent
    },
];
