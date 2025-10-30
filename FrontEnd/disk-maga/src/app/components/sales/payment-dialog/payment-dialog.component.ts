import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Payment } from '../../../enums/payment';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PaymentDialogData {
  total: number;
  selectedTotal: number;
  remainingTotal: number;
  hasUnselectedProducts: boolean;
  selectedCount: number;
  totalCount: number;
}

export interface PaymentDialogResult {
  success: boolean;
  paymentMethod?: Payment;
}
@Component({
  selector: 'app-payment-dialog',
  imports: [MatDialogModule, MatDivider, MatIcon, MatButtonModule],
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.css',
})
export class PaymentDialogComponent {
  selectedPayment: Payment | null = null;

  Payment = Payment;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent, PaymentDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData,
    private snackBar: MatSnackBar
  ) {}

  selectPaymentMethod(method: Payment): void {
    this.selectedPayment = method;
  }

  isSelected(method: Payment): boolean {
    return this.selectedPayment === method;
  }

  continue(): void {
    if (this.selectedPayment === null) {
      this.snackBar.open('Por favor, selecione um método de pagamento', 'Fechar', { duration: 3000 });
      return;
    }

    this.dialogRef.close({
      success: true,
      paymentMethod: this.selectedPayment,
    });
  }

  cancel(): void {
    this.dialogRef.close({
      success: false,
    });
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
