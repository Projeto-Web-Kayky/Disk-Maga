import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imagem-cliente',
  templateUrl: './imagem-cliente.component.html',
  styleUrls: ['./imagem-cliente.component.css']
})
export class ImagemClienteComponent {
  @Input() src: string | null = null;
  @Input() alt: string = '';
}
