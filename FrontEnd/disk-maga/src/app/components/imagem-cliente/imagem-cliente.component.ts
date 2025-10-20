import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-imagem-cliente',
  imports: [],
  templateUrl: './imagem-cliente.component.html',
  styleUrl: './imagem-cliente.component.css'
})
export class ImagemCliente {
  @Input() imagePath: string = '';
}
