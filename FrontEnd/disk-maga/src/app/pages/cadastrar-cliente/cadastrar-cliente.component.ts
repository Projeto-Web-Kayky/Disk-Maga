import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TopBar, TopBarComponent } from '../../components/top-bar/top-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const COMPONENTS = [TopBarComponent];
const MODULES = [MatButtonModule, MatIconModule];

@Component({
  selector: 'app-cadastrar-cliente',
  imports: [ReactiveFormsModule, COMPONENTS, MODULES],
  templateUrl: './cadastrar-cliente.component.html',
  styleUrl: './cadastrar-cliente.component.css'
})
export class CadastrarCliente {
  constructor() {
    const plus_icon = 'assets/icons/plus.svg'
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon('plus', sanitizer.bypassSecurityTrustResourceUrl(plus_icon));
  }
}
