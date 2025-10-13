import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AntiAuthGuard } from './anti-auth.guard';

export const publicRoutes = ['/login'];

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AntiAuthGuard]
    }
];
