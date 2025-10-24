import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: 'app-sales',
  imports: [
    MatDivider,
    MatIcon,
    MatFormFieldModule,
    MatFabButton,
    MatCard,
    MatCardContent,
    MatList,
    MatListItem,
    MatIconButton,
    MatMenuModule
],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

}
