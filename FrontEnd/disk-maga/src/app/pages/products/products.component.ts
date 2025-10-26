import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Category } from '../../enums/category';
import { UnityMeasure } from '../../enums/unity-measure';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products.component',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  productForm!: FormGroup;
  isSubmitting = false;

  category = Object.keys(Category)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: Category[key as keyof typeof Category],
      viewValue: key.replace('_', ' '),
    }));

  unityMeasure = Object.keys(UnityMeasure)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: UnityMeasure[key as keyof typeof UnityMeasure],
      viewValue: key.replace('_', ' '),
    }));

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    const numericValidator = Validators.pattern(/^[0-9.,]*$/);

    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      costPrice: ['', [Validators.required, numericValidator]],
      salePrice: ['', [Validators.required, numericValidator]],
      quantity: ['', [Validators.required]],
      unityMeasure: ['', [Validators.required]],
    });
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const allowedChars = /[0-9.,]/;
    const inputChar = event.key;
    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }

  private resetForm(): void {
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.productForm.updateValueAndValidity();
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    this.isSubmitting = true;

    const formValue = this.productForm.value;

    const parseCurrency = (value: string) => {
      if (!value) return 0;
      return parseFloat(value.replace(/\./g, '').replace(',', '.'));
    };

    const product = {
      productName: formValue.productName,
      category: parseFloat(formValue.category),
      costPrice: parseCurrency(formValue.costPrice),
      salePrice: parseCurrency(formValue.salePrice),
      quantity: formValue.quantity,
      unityMeasure: formValue.unityMeasure,
    };

    this.productService.addProduct(product).subscribe({
      next: () => {
        this.snackBar.open('Produto adicionado com sucesso!', 'Fechar', { duration: 3000 });
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.snackBar.open('Erro ao adicionar produto. Tente novamente.', 'Fechar', {
          duration: 3000,
        });
        console.error('Erro ao adicionar produto:', error);
        this.isSubmitting = false;
      },
    });
  }
}
