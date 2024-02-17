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

    if (requiresAuth && !this.authService.getCurrentUser()) {
      this.router.navigate(['/auth/login']); // Redirect to the login page if authentication is required but not authenticated
      return false;
    }

    return true; // Allow access to the route
  }
}
