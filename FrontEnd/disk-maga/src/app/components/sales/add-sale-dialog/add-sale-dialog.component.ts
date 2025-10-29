import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IProduct } from '../../../interfaces/iproduct';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { SaleService } from '../../../services/sale.service';
import { ISale } from '../../../interfaces/isale';
import { Payment } from '../../../enums/payment';
import { IServiceResponse } from '../../../interfaces/iservice-response';

@Component({
  selector: 'app-add-sale-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    DecimalPipe,
    MatDividerModule
  ],
  templateUrl: './add-sale-dialog.component.html',
  styleUrls: ['./add-sale-dialog.component.css'],
})
export class AddSaleDialogComponent implements OnInit, OnDestroy {
  myControl = new FormControl<string>('');
  filteredProducts: IProduct[] = [];
  productsInSale: (IProduct & { quantity: number; selected: boolean })[] = [];
  total = 0;

  private destroy$ = new Subject<void>();
  readonly dialog = inject(MatDialog)

  private readonly DIALOG_CONFIG = {
    PAYMENT_METHOD: {
      width: '1300px',
      maxWidth: '90vw',
      height: '80vh',
      maxHeight: '90vh',
    },
  } as const;

  constructor(
    private productService: ProductService,
    private saleService: SaleService
  ) {}

  ngOnInit() {
    console.log('🚀 Componente iniciado');
    
    this.myControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          console.log('🔍 Buscando por:', value);
          return this.productService.searchProducts(value || '');
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: IServiceResponse<IProduct[]>) => {
          this.filteredProducts = response.data;
        },
        error: (err) => {
          console.error('Erro ao buscar produtos:', err);
        },
      });
  }

  addProduct(product: IProduct) {
    
    if (!product.id) {
      console.error('Produto sem ID:', product);
      alert('Erro: Produto sem ID válido');
      return;
    }
    
    const existing = this.productsInSale.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.productsInSale.push({ ...product, quantity: 1, selected: true });
    }
    
    this.updateTotal();
    this.myControl.setValue('');
    console.log('Produtos na venda:', this.productsInSale);
  }

  increment(item: any) {
    item.quantity++;
    this.updateTotal();
  }

  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal();
    }
  }

  updateTotal() {
    this.total = this.productsInSale
      .filter((p) => p.selected)
      .reduce((sum, p) => sum + p.salePrice * p.quantity, 0);
  }

  openPaymentDialog() {
    const selected = this.productsInSale.filter((p) => p.selected);
  const unselected = this.productsInSale.filter((p) => !p.selected);

  if (selected.length === 0) {
    console.error('Nenhum produto selecionado!');
    alert('Por favor, selecione pelo menos um produto para pagar');
    return;
  }

  const validProducts = selected.filter((p) => p.id !== undefined && p.id !== null);
  
  if (validProducts.length === 0) {
    console.error('Nenhum produto possui ID válido!');
    alert('Erro: Produtos sem ID válido');
    return;
  }

  const selectedTotal = selected.reduce((sum, p) => sum + (p.salePrice * p.quantity), 0);
  const remainingTotal = unselected.reduce((sum, p) => sum + (p.salePrice * p.quantity), 0);
  const hasUnselectedProducts = unselected.length > 0;

  const dialogRef = this.dialog.open(PaymentDialogComponent, {
    ...this.DIALOG_CONFIG.PAYMENT_METHOD,
    data: {
      total: this.total,
      selectedTotal: selectedTotal,
      remainingTotal: remainingTotal,
      hasUnselectedProducts: hasUnselectedProducts,
      selectedCount: selected.length,
      totalCount: this.productsInSale.length
    },
    disableClose: true
  });

  dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      if (result?.success && result?.paymentMethod !== undefined) {

        const sale: ISale = {
          productIds: validProducts.map((p) => p.id!),
          quantities: validProducts.map((p) => p.quantity),
          clientId: null,
          payment: result.paymentMethod
        };

        this.saleService.newSale(sale).subscribe({
          next: (res) => {
            console.log('Venda registrada com sucesso!', res);
            
            if (hasUnselectedProducts) {
              // PAGAMENTO PARCIAL: Remover apenas os produtos pagos
              this.productsInSale = this.productsInSale.filter(p => !p.selected);
              
              // Marcar todos os restantes como selecionados para o próximo pagamento
              this.productsInSale.forEach(p => p.selected = true);
              
              this.updateTotal();
              
              alert(
                `Pagamento parcial realizado com sucesso!\n\n` +
                `Pago: ${this.formatCurrency(selectedTotal)}\n` +
                `Restante: ${this.formatCurrency(remainingTotal)}\n\n` +
                `${this.productsInSale.length} produto(s) ainda na lista.`
              );
              
              console.log('📋 Produtos restantes:', this.productsInSale);
            } else {
              // PAGAMENTO COMPLETO: Limpar tudo
              this.productsInSale = [];
              this.total = 0;
              this.myControl.setValue('');
              
              alert('Venda finalizada com sucesso!');
            }
          },
          error: (err) => {
            console.error('Erro ao registrar venda:', err);
            alert('Erro ao registrar venda: ' + (err.error?.message || 'Erro desconhecido'));
          },
        });
      } else {
        console.log('Pagamento cancelado');
      }
    });
  }

  formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

  displayProduct(product?: IProduct): string {
    return product ? product.productName : '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}