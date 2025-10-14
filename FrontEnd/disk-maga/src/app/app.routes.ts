import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AntiAuthGuard } from './anti-auth.guard';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './pages/products.component/products.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

export const publicRoutes = ['/login'];

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AntiAuthGuard]
    },
    {
        path: 'products',
        component: ProductsComponent,
        // canActivate: [AuthGuard],
        data: { title: 'Produtos', subTitle: 'Adicionar um novo produto' }
    },
    {
        path: 'navbar',
        component: NavBarComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
