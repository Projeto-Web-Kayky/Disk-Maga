import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IProductResponse } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';

interface StockStats {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
}

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  searchTerm: string = '';
  products: IProductResponse[] = [];
  filteredProducts: IProductResponse[] = [];
  stats: StockStats = { totalProducts: 0, totalValue: 0, lowStockCount: 0 };
  isLoading: boolean = false;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        if (!response?.data) {
          this.products = [];
          this.filteredProducts = [];
          this.calculateStats();
          this.isLoading = false;
          return;
        }
        
        this.products = response.data;
        this.filteredProducts = this.products;
        this.calculateStats();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  calculateStats(): void {
    this.stats.totalProducts = this.products.length;
    this.stats.totalValue = this.products.reduce(
      (acc, p) => acc + (p.salePrice * p.quantity), 
      0
    );
    this.stats.lowStockCount = this.products.filter(
      p => this.getStockStatus(p.quantity) !== 'normal'
    ).length;
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = this.products;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.productName.toLowerCase().includes(term) ||
      p.productId.toString().includes(term) ||
      p.category
    );
  }

  getStockStatus(quantity: number): 'normal' | 'low' | 'critical' {
    if (quantity < 10) return 'critical';
    if (quantity < 50) return 'low';
    return 'normal';
  }

  getStatusColor(quantity: number): string {
    const status = this.getStockStatus(quantity);
    switch(status) {
      case 'critical': return 'warn';
      case 'low': return 'accent';
      default: return 'primary';
    }
  }

  getStatusText(quantity: number): string {
    const status = this.getStockStatus(quantity);
    switch(status) {
      case 'critical': return 'Crítico';
      case 'low': return 'Baixo';
      default: return 'Normal';
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearchChange();
  }

  goBack(): void {
    window.history.back();
  }

  deleteProduct(productId: number): void {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.snackBar.open('Produto excluído com sucesso', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadData();
      },
      error: (error) => {
        console.error('Erro ao excluir produto:', error);
        this.snackBar.open('Erro ao excluir produto', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  refreshData(): void {
    this.loadData();
    this.snackBar.open('Dados atualizados', 'Fechar', {
      duration: 2000
    });
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}