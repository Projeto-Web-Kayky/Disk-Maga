import { CommonModule, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';

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
export class AddSaleDialogComponent {
  myControl = new FormControl<string | IProduct>('');

  products = [
    { name: 'Heineken 600ml', price: 12, quantity: 5, selected: false },
    { name: 'Batata frita', price: 12, quantity: 1, selected: true },
    { name: 'Coca-cola 350ml', price: 12, quantity: 1, selected: true },
  ];

  readonly dialog = inject(MatDialog)

  private readonly destroy$ = new Subject<void>();

  private readonly DIALOG_CONFIG = {
    PAYMENT_METHOD: {
      width: '1300px',
      maxWidth: '90vw',
      height: '80vh',
      maxHeight: '90vh',
    },
  } as const;

  increment(item: any) {
    item.quantity++;
  }

  decrement(item: any) {
    if (item.quantity > 1) item.quantity--;
  }
  

  openPaymentDialog() {
      const dialogRef = this.dialog.open(PaymentDialogComponent, this.DIALOG_CONFIG.PAYMENT_METHOD);
  
      dialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          if (result?.success) {
            console.log("Carregou");
          }
        });
    }

  
}
