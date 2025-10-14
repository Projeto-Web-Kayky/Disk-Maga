import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AntiAuthGuard } from './anti-auth.guard';
import { NavBar } from './components/nav-bar/nav-bar.component';

export const publicRoutes = ['/login'];

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AntiAuthGuard]
    },
    {
        path: 'navbar',
        component: NavBar
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
