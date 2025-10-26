import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AntiAuthGuard } from './anti-auth.guard';
import { AuthGuard } from './auth.guard';
import { Clientes } from './pages/clientes/clientes.component';
import { CadastrarCliente } from './pages/cadastrar-cliente/cadastrar-cliente.component';
import { ProductsComponent } from './pages/products/products.component';
import { StockComponent } from './pages/stock/stock.component';
import { SalesComponent } from './pages/sales/sales.component';

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
        data: { title: 'Cadastrar Produto' }
    },
    {
        path: 'products',
        component: StockComponent,
        canActivate: [AuthGuard],
        data: { title: 'Estoque' }
    },
    {
        path: 'sales',
        component: SalesComponent,
        canActivate: [AuthGuard],
        data: { title: 'Vendas' }
    },
    {
        path: 'clientes',
        component: Clientes,
        canActivate: [AntiAuthGuard]
    },
    {
        path: 'cadastrar-cliente',
        component: CadastrarCliente,
        canActivate: [AntiAuthGuard]
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