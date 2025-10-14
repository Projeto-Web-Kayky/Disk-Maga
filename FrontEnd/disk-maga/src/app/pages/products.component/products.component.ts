import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { ProductService } from '../../services/product.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Category } from '../../enums/category';
import { UnityMeasure } from '../../enums/unity-measure';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';

@Component({
  selector: 'app-products.component',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDividerModule, MatListModule, MatButtonModule, NavBarComponent, TopBarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  constructor(
    private productService: ProductService,
  ) {}

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
}
  