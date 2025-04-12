import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

/**
 * Auth Guard that protect routes by checking the users authentication state.
 * It uses the authState$ Observable from the AuthenticationService, pipes the value through the
 * map operator:
 * 
 * if the user is logged in: return true
 * if not: return false
 * 
 * @param _ 
 * @param state 
 * @returns an Observable that is true(route allowed) or a UrlTree that redirects to /login page
 */
export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.authState$.pipe(
    map(user => {
      if (user) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  )
};
