import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AntiAuthGuard } from './anti-auth.guard';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './pages/products.component/products.component';

// Lista de rotas onde a navbar/topbar NÃO devem aparecer
export const publicRoutes = ['/login', '/cadastro', '/recuperar-senha'];

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AntiAuthGuard]
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        data: { title: 'Produtos' }
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