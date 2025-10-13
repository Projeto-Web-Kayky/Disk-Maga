import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "./services/login.service";

@Injectable({
  providedIn: 'root'
})
export class AntiAuthGuard implements CanActivate {
    constructor(
        private loginService: LoginService,
        private router: Router
    ) {}

    canActivate(): boolean {
        if (this.loginService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}