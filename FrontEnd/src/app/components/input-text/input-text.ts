import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  standalone: true,
  templateUrl: './input-text.html',
  styleUrl: './input-text.css',
})
export class InputText {
  @Input() description: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() classes: string = 'inputContent homepageInput';

  criarInput(description: string, type: string, placeholder: string, classes: string) {
    this.description = description;
    this.type = type;
    this.placeholder = placeholder;
    this.classes = classes;
  }
}
