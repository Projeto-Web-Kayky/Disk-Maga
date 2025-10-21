import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { ProductService } from '../../services/product.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../enums/category';
import { UnityMeasure } from '../../enums/unity-measure';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products.component',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDividerModule, MatListModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  productForm!: FormGroup;
  salePrice: string = '';
  costPrice: string = '';

  category = Object.keys(Category)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      value: Category[key as keyof typeof Category],
      viewValue: key.replace('_', ' ')
    }));

  unityMeasure = Object.keys(UnityMeasure)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      value: UnityMeasure[key as keyof typeof UnityMeasure],
      viewValue: key.replace('_', ' ')
    }))

    constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      costPrice: ['', [Validators.required]],
      salePrice: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unityMeasure: ['', [Validators.required]],
    });
  }

  formatCurrency(value: string): string {
    if (!value) return '';
    const numValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
    return numValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }

  updateCurrency(event: any, field: 'salePrice' | 'costPrice'): void {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const formattedValue = this.formatCurrency(numericValue);
    
    this[field] = numericValue;
    this.productForm.get(field)?.setValue(numericValue, { emitEvent: false });
    event.target.value = formattedValue;
  }

  private resetForm(): void {
    this.salePrice = '';
    this.costPrice = '';
    
    const emptyForm = {
      productName: '',
      salePrice: '',
      costPrice: '',
      stockQuantity: '',
      unitMeasure: '',
      category: '',
    };

    this.productForm.reset(emptyForm, { emitEvent: false });
    
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      if (control) {
        control.setErrors(null);
        control.markAsUntouched();
        control.markAsPristine();
      }
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios',
        'Fechar',
        { duration: 3000 }
      );
      return;
    }

    const formValue = this.productForm.value;
    const product = {
      productName: formValue.productName,
      category: parseFloat(formValue.category),
      costPrice: parseFloat(formValue.costPrice) / 100,
      salePrice: parseFloat(formValue.salePrice) / 100,
      quantity: formValue.quantity,
      unityMeasure: formValue.unityMeasure,
    };

    this.productService.addProduct(product).subscribe({
      next: () => {
        this.snackBar.open('Produto adicionado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.resetForm();
      },
      error: (error) => {
        this.snackBar.open(
          'Erro ao adicionar produto. Tente novamente.',
          'Fechar',
          { duration: 3000 }
        );
        console.error('Erro ao adicionar produto:', error);
      },
    });
  }
} 
  