import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IProduct } from '../../../interfaces/iproduct';
import { MatDividerModule } from '@angular/material/divider';

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
    AsyncPipe,
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

  increment(item: any) {
    item.quantity++;
  }

  decrement(item: any) {
    if (item.quantity > 1) item.quantity--;
  }

  
}
