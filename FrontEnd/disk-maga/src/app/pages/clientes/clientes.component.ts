import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

const COMPONENTS = [TopBarComponent];
const MODULES = [MatButtonModule, MatIconModule];

@Component({
  selector: 'app-clientes',
  imports: [ReactiveFormsModule, COMPONENTS, MODULES],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class Clientes {
  constructor(private router: Router) {
    const plus_icon = 'assets/icons/plus.svg'
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon('plus', sanitizer.bypassSecurityTrustResourceUrl(plus_icon));
  }
  goToClientRegister() {
    this.router.navigate(['/cadastrar-cliente'])
  }
}
