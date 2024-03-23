import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { catchError, map } from 'rxjs';

export const updateProfilGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isloggedIn) return true;
  else {
    router.navigate(['app-404']);
    return false;
  }
};

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => updateProfilGuard(route, state);
