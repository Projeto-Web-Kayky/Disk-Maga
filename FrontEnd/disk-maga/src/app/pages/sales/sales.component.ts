import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AddSaleDialogComponent } from '../../components/sales/add-sale-dialog/add-sale-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SaleService } from '../../services/sale.service';
import { ISale, ISaleResponse } from '../../interfaces/isale';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { ExpandSaleDetails } from '../../components/sales/expand-sale-details/expand-sale-details.component';
import { Payment } from '../../enums/payment';
import { CommonModule } from '@angular/common';

interface SaleItem {
  more: ISale;
  dateTime: string;
  item: string;
  subtotal: number;
}
@Component({
  selector: 'app-sales',
  imports: [
    CommonModule,
    MatDivider,
    MatIcon,
    MatFormFieldModule,
    MatFabButton,
    MatCard,
    MatCardContent,
    MatIconButton,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit, OnDestroy {
  sales: ISaleResponse[] = [];
  isLoading = false;

  private readonly destroy$ = new Subject<void>();
  readonly dialog = inject(MatDialog);

  displayedColumns = ['more', 'dateTime', 'item', 'subtotal'];
  dataSource = new MatTableDataSource<SaleItem>();

  constructor(
    private readonly saleService: SaleService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

    private readonly DIALOG_CONFIG = {
    ADD_SALE: {
      width: '1300px',
      maxWidth: '90vw',
      height: '80vh',
      maxHeight: '90vh',
    },
    SALE_DETAILS: {
      width: '800px',
    },
  } as const;

  private readonly DIALOG_DETAILS_CONFIG = {
    CONFIGS: {
      width: '90%',
      maxWidth: '40vw' //fui colocar umas estilizações extras, mas não serviu como eu queria, deixei só isso msm
    }
  } as const;

  loadSales(): void {
    this.isLoading = true;

    this.saleService.getAllSales()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.sales = response.data || [];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.sales = [];
          this.isLoading = false;
        },
      });
  }

  openAddSaleDialog(): void {
    const dialogRef = this.dialog.open(
      AddSaleDialogComponent,
      this.DIALOG_CONFIG.ADD_SALE
    );

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result?.success) {
          this.loadSales();
        }
      });
  }
  
  openSaleDetails(sale: ISaleResponse): void {
    this.dialog.open(ExpandSaleDetails, {
      ...this.DIALOG_CONFIG.SALE_DETAILS,
      data: sale,
    });
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getPaymentMethodLabel(payment: Payment): string {
    const labels = {
      [Payment.PIX]: 'Pix',
      [Payment.DINHEIRO]: 'Dinheiro',
      [Payment.CARTAO]: 'Cartão',
      [Payment.FIADO]: 'Fiado',
    };
    return labels[payment] || 'Não especificado';
  }

  getProductsSummary(sale: ISaleResponse): string {
    if (!sale.products || sale.products.length === 0) {
      return 'Nenhum produto';
    }

    const firstTwo = sale.products.slice(0, 2);
    const summary = firstTwo
      .map((product, index) => {
        const quantity = sale.quantities[index] || 1;
        return `${quantity}x ${product.productName}`;
      })
      .join(', ');

    if (sale.products.length > 2) {
      return `${summary}...`;
    }

    return summary;
  }

  getProductsList(sale: ISaleResponse): string[] {
  if (!sale.products || sale.products.length === 0) {
    return ['Nenhum produto'];
  }

  return sale.products.map((product, index) => {
    const quantity = sale.quantities[index] || 1;
    return `${quantity}x ${product.productName}`;
  });
}

  trackBySale(index: number, sale: ISaleResponse): string {
  return sale.saleDate + index.toString();
  }
}

