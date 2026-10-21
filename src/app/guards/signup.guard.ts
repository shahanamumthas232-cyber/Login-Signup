import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const signupGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const signupData = localStorage.getItem('user_signup_data');
  if (signupData) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};
