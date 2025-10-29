import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expand-sale-details',
  imports: [MatIcon, CommonModule],
  templateUrl: './expand-sale-details.component.html',
  styleUrl: './expand-sale-details.component.css'
})

export class ExpandSaleDetails {
  saleId = '1234';
  date = '18/01/2025';
  paymentMethod = 'PIX';
  total = 36.00;
  items = [
    { name: 'Coca-cola 350ml', qty: 1, price: 12.00 },
    { name: 'Coca-cola 350ml', qty: 1, price: 12.00 },
    { name: 'Coca-cola 350ml', qty: 1, price: 12.00 }
  ];

  constructor(private dialogRef: MatDialogRef<ExpandSaleDetails>) { }

  close() {
    this.dialogRef.close();
  }
}