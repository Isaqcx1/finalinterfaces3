import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

export const adminGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);


  if (!auth.isAdmin()) {
    router.navigate(['/usuario/dashboard']);
    return false;
  }

  return true;
};
