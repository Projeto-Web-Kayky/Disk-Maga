import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Payment } from '../../../enums/payment';
import { ISaleResponse } from '../../../interfaces/isale';

interface SaleDetailItem {
  name: string;
  quantity: number;
  price: number;
}
@Component({
  selector: 'app-expand-sale-details',
  imports: [MatIcon, CommonModule],
  templateUrl: './expand-sale-details.component.html',
  styleUrl: './expand-sale-details.component.css'
})

export class ExpandSaleDetails {
  saleId: string;
  date: string;
  paymentMethod: string;
  total: number;
  clientName: string | null;
  items: SaleDetailItem[] = [];

  constructor(
    private dialogRef: MatDialogRef<ExpandSaleDetails>,
    @Inject(MAT_DIALOG_DATA) public data: ISaleResponse
  ) {
    console.log('📋 Dados da venda recebidos:', data);
    
    this.saleId = this.generateSaleId(data.saleDate);
    this.date = this.formatDate(data.saleDate);
    this.paymentMethod = this.getPaymentMethodLabel(data.payment);
    this.total = data.subtotal;
    this.clientName = data.clientName;
    
    this.items = this.processItems(data);
  }

  private generateSaleId(dateString: string): string {
    const date = new Date(dateString);
    const timestamp = date.getTime();
    return timestamp.toString().slice(-8);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private getPaymentMethodLabel(payment: Payment | string): string {
    if (typeof payment === 'string') {
      return payment.charAt(0).toUpperCase() + payment.slice(1).toLowerCase();
    }
    const labels = {
      [Payment.PIX]: 'PIX',
      [Payment.DINHEIRO]: 'Dinheiro',
      [Payment.CARTAO]: 'Cartão',
      [Payment.FIADO]: 'Fiado',
    };
    return labels[payment] || 'Não especificado';
  }

  private processItems(sale: ISaleResponse): SaleDetailItem[] {
    if (!sale.products || !sale.quantities) {
      return [];
    }

    return sale.products.map((product, index) => ({
      name: product.productName,
      quantity: sale.quantities[index] || 1,
      price: product.salePrice
    }));
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}