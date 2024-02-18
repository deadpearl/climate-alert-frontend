// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiresAuth = next.data.requiresAuth !== false; // Check if authentication is explicitly disabled for this route

    if (requiresAuth && !this.authService.loggedIn()) {
      console.log('AuthGuard - Redirecting to /auth/login');
      this.router.navigate(['/auth/login']);
      return false;
    }

    console.log('AuthGuard - Allowing access');
    return true;
  }
}
