import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LoginService } from "./services/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private loginService: LoginService,
        private router: Router) {}

        canActivate(): boolean | UrlTree {
            if (this.loginService.isAuthenticated()) {
                return true;
            }

            const token = this.loginService.getToken();
            if (token && this.loginService.jwtHelper.isTokenExpired(token)) {
                localStorage.removeItem('auth_token');
            }

            this.router.navigate(['/login'], {
                queryParams: { returnUrl: this.router.url },
            });
            return false;
            
        }
    }