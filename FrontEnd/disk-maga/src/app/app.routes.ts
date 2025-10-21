import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AntiAuthGuard } from './anti-auth.guard';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './pages/products/products.component';
import { StockComponent } from './pages/stock/stock.component';

export const publicRoutes = ['/login'];

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AntiAuthGuard]
    },
    {
        path: 'products/new-product',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        data: { title: 'Produtos' }
    },
    {
        path: 'products',
        component: StockComponent,
        canActivate: [AuthGuard],
        data: { title: 'Estoque' }
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];